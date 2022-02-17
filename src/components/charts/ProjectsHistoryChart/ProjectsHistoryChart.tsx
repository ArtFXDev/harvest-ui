import ChartContainer from "components/charts/ChartContainer/ChartContainer";
import DateSelector from "components/common/DateSelector/DateSelector";
import { useFetchData } from "hooks/fetch";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getColorFromString } from "utils/colors";
import { normalizeToPercentWithTotal } from "utils/data";
import * as DateUtils from "utils/date";

const ProjectsHistoryChart = (): JSX.Element => {
  const [startDate, setStartDate] = useState<Date>(DateUtils.yesterday());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const data = useFetchData(
    "history/project-usage",
    {},
    { start: startDate.getTime(), end: endDate.getTime() }
  );

  const projects = useFetchData("info/projects");

  const formattedData =
    data &&
    projects &&
    data.map((entry) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, ...rest } = entry;
      const toPercent = normalizeToPercentWithTotal(rest);

      // Add missing projects
      for (const project of projects) {
        if (!(project in entry)) {
          entry[project] = 0;
        }
      }

      return { ...toPercent, createdAt: new Date(entry.createdAt).getTime() };
    });

  return (
    <ChartContainer
      title="Project usage history"
      right={
        <DateSelector
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      }
    >
      <AreaChart
        width={800}
        height={500}
        data={formattedData}
        className="chart"
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          type="number"
          dataKey="createdAt"
          domain={["dataMin", "dataMax"]}
          tickFormatter={DateUtils.timestampToMMHH}
          height={50}
          label={{
            value: "Time",
            position: "insideBottom",
          }}
        />

        <YAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(value) => `${Math.floor(value)}%`}
        />

        {projects &&
          projects
            .sort((a, b) => a.localeCompare(b))
            .map((project) => (
              <Area
                type="basis"
                dataKey={project}
                stackId="1"
                key={project}
                strokeWidth={3}
                stroke={getColorFromString(project)}
                fill={getColorFromString(project)}
              />
            ))}

        <Tooltip
          labelFormatter={(p: number) =>
            `${DateUtils.timestampToMMDDYYYY(p)} at ${DateUtils.timestampToMMHH(
              p
            )}`
          }
          formatter={(p: number) => `${Math.floor(p)}%`}
        />

        <Legend />
      </AreaChart>
    </ChartContainer>
  );
};

export default ProjectsHistoryChart;
