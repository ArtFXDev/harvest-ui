import ChartContainer from "components/charts/ChartContainer/ChartContainer";
import { useFetchData } from "hooks/fetch";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TASK_STATUSES } from "types/api";
import { TASK_STATUS_COLOR } from "utils/colors";

const TaskStatusPerProject = (): JSX.Element => {
  const data = useFetchData("info/task-status-per-project");

  return (
    <ChartContainer title="Task status average">
      <BarChart
        data={data}
        className="chart"
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(value) => `${Math.floor(value)}%`}
        />

        <Tooltip />

        <Legend />

        {TASK_STATUSES.map((status, i) => {
          return (
            <Bar
              key={status}
              dataKey={status}
              stackId="a"
              fill={TASK_STATUS_COLOR[status]}
            />
          );
        })}
      </BarChart>
    </ChartContainer>
  );
};

export default TaskStatusPerProject;
