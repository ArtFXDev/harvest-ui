import ChartContainer from "components/charts/ChartContainer/ChartContainer";
import { useFetchData } from "hooks/fetch";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  COLORS,
  getColorFromString,
  getDarkerColorFromString,
} from "utils/colors";
import { shortenName } from "utils/string";

/**
 * Number of jobs sent per project
 */
const ProjectFrequencyBarChart = (): JSX.Element => {
  const jobsPerOwner = useFetchData("info/jobs-per-project");
  let data: { name: string; jobs: number; tasks: number }[] = [];

  if (jobsPerOwner) {
    for (const key of Object.keys(jobsPerOwner)) {
      const job = jobsPerOwner[key];
      data.push({ name: key, jobs: job.jobs, tasks: job.tasks });
    }
    data = data.sort((a, b) => a.tasks - b.tasks);
  }

  return (
    <ChartContainer title="Jobs / tasks submitted per project" height={500}>
      <BarChart
        data={data}
        className="chart"
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="name"
          angle={-30}
          textAnchor="end"
          interval={0}
          tickFormatter={(value) => shortenName(value)}
        />

        <YAxis
          yAxisId="left"
          orientation="left"
          stroke="#8884d8"
          domain={[0, (dataMax: number) => dataMax * 1.1]}
          tickFormatter={(v) => `${Math.round(v)} jobs`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#82ca9d"
          domain={[0, (dataMax: number) => dataMax * 1.15]}
          tickFormatter={(v) => `${Math.round(v)} tasks`}
        />

        <Tooltip />

        <Bar
          dataKey="jobs"
          fill={COLORS.blue}
          yAxisId="left"
          label={{
            position: "top",
            formatter: (value: string) => `${value} jobs`,
          }}
        >
          {data &&
            data.map((sample) => (
              <Cell key={sample.name} fill={getColorFromString(sample.name)} />
            ))}
        </Bar>

        <Bar
          dataKey="tasks"
          fill={COLORS.blue}
          yAxisId="right"
          label={{
            position: "top",
            formatter: (value: string) => `${value} tasks`,
          }}
        >
          {data &&
            data.map((sample) => (
              <Cell
                key={sample.name}
                fill={getDarkerColorFromString(sample.name)}
              />
            ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default ProjectFrequencyBarChart;
