import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import styles from "./BladeStatePieChart.module.scss";

import { PROJECTS } from "global.d";
import ChartUtils from "utils/chart-utils";
import { toNameValue } from "utils/api";
import { useFetchData } from "hooks/fetch";

/**
 * Distribution of free / busy and nimby on computers in real time on the farm
 */
const PCStatePieChart = (): JSX.Element => {
  const data = useFetchData<{ [status: string]: number }>(
    "stats/blade-status",
    { interval: 10000 }
  );

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

          <Tooltip content={ChartUtils.renderPieChartTooltipContent} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PCStatePieChart;
