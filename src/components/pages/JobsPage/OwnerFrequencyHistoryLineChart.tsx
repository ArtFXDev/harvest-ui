import ChartContainer from "components/common/ChartContainer/ChartContainer";
import { useFetchData } from "hooks/fetch";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getColorFromString } from "utils/colors";

const OwnerFrequencyHistoryLineChart = (): JSX.Element => {
  const jobsPerOwnerHistory = useFetchData(
    "history/jobs-per-owner",
    {},
    { resolution: 50 }
  );
  let owners;

  if (jobsPerOwnerHistory) {
    const set = new Set<string>();
    for (const sample of jobsPerOwnerHistory) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, ...rest } = sample;
      Object.keys(rest).forEach((k) => set.add(k));
    }
    owners = Array.from(set);
  }

  return (
    <ChartContainer title="Jobs submitted per user (history)" height={500}>
      <LineChart
        width={500}
        height={300}
        data={jobsPerOwnerHistory}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
        <Legend />

        {owners &&
          owners.map((owner) => (
            <Line
              key={owner}
              dot={false}
              strokeWidth={2}
              type="linear"
              dataKey={owner}
              stroke={getColorFromString(owner)}
            />
          ))}
      </LineChart>
    </ChartContainer>
  );
};

export default OwnerFrequencyHistoryLineChart;
