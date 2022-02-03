import { PROJECTS } from "global.d";
import { useFetchData } from "hooks/fetch";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { toNameValue } from "utils/api";
import * as ChartUtils from "utils/chart";

import styles from "./BladeStatePieChart.module.scss";

/**
 * Distribution of free/nimby/busy/off computers currently on the farm
 */
const CurrentBladeUsagePieChart = (): JSX.Element => {
  const data = useFetchData("current/blade-usage", { interval: 10000 });
  const pieData = toNameValue(data);

  return (
    <div className="chartContainerSmall">
      <ResponsiveContainer width="99%" minWidth="0">
        <PieChart width={250} height={250} className="chart">
          <Pie
            data={toNameValue(data)}
            dataKey="value"
            innerRadius="60%"
            outerRadius="80%"
            labelLine={false}
            animationDuration={800}
            paddingAngle={5}
            isAnimationActive={true}
            label={({ percent, index }) =>
              pieData && `${pieData[index].name}: ${Math.round(percent * 100)}%`
            }
          >
            {pieData &&
              pieData.map((el, i) => (
                <Cell
                  key={`pcstate-${i}`}
                  fill={PROJECTS[i].color}
                  color={PROJECTS[i].color}
                />
              ))}

            <Label
              value="Computer state"
              position="center"
              className={styles.centeredLabel}
            />
          </Pie>

          <Tooltip content={ChartUtils.coloredTooltip} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrentBladeUsagePieChart;
