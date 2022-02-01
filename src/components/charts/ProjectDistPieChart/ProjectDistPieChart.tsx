import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import styles from "./ProjectDistPieChart.module.scss";

import ChartUtils from "utils/chart-utils";
import { useFetchData } from "hooks/fetch";
import { toNameValue } from "utils/api";

/**
 * Distribution of free / busy and nimby on computers in real time on the farm
 */
const ProjectDistPieChart: React.FC = () => {
  const data = useFetchData<{ [project: string]: number }>(
    "stats/project-usage",
    { interval: 10000 }
  );
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
                ? `${pieData[index].name}: ${Math.round(percent * 100)}%`
                : ""
            }
            animationDuration={800}
            paddingAngle={5}
            isAnimationActive={true}
          >
            {pieData &&
              pieData.length !== 0 &&
              pieData.map((project, i) => {
                return <Cell key={`pcstate-${i}`} fill={"#ff6a00"} />;
              })}

            <Label
              value="Project usage"
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

export default ProjectDistPieChart;
