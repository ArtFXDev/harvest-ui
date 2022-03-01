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
import { toNameValue } from "utils/api";
import { COLORS, lerpColor } from "utils/colors";

/**
 * Number of jobs sent per each owner
 */
const OwnerFrequencyBarChart = (): JSX.Element => {
  const jobsPerOwner = useFetchData("info/jobs-per-owner");
  let data = toNameValue(jobsPerOwner);

  if (data) {
    data = data.sort((a, b) => a.value - b.value).slice(-25);
  }

  return (
    <ChartContainer title="Jobs submitted per user" height={500}>
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

        <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />

        <YAxis type="number" domain={[0, (dataMax: number) => dataMax + 10]} />

        <Tooltip formatter={(value: string) => `${value} jobs`} />

        <Bar dataKey="value" fill={COLORS.blue} label={{ position: "top" }}>
          {data &&
            data.map((sample, i) => (
              <Cell
                key={sample.name}
                fill={lerpColor(
                  176,
                  53,
                  139,
                  0,
                  155,
                  217,
                  i / (data ? data.length : 1)
                )}
              />
            ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default OwnerFrequencyBarChart;
