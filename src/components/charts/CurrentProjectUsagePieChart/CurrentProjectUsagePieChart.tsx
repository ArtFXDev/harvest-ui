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
import { getColorFromString } from "utils/colors";
import { shortenName } from "utils/string";

import styles from "./CurrentProjectUsagePieChart.module.scss";

/**
 * Current project distribution on the farm
 */
const CurrentProjectUsagePieChart = (): JSX.Element => {
  const data = useFetchData("current/project-usage", { interval: 10000 });
  const pieData = toNameValue(data);

  return (
    <div className="chartContainerSmall">
      <ResponsiveContainer width="99%" minWidth="0">
        <PieChart width={250} height={250} className="chart">
          <Pie
            data={pieData}
            dataKey="value"
            innerRadius="60%"
            outerRadius="80%"
            labelLine={false}
            label={({ percent, index }) =>
              pieData
                ? `${shortenName(pieData[index].name)}: ${Math.round(
                    percent * 100
                  )}%`
                : ""
            }
            animationDuration={800}
            paddingAngle={5}
            isAnimationActive={true}
          >
            {pieData &&
              pieData.length !== 0 &&
              pieData.map((project, i) => {
                return (
                  <Cell
                    key={`pcstate-${i}`}
                    fill={getColorFromString(project.name)}
                  />
                );
              })}

            <Label
              value="Project usage"
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

export default CurrentProjectUsagePieChart;
