import ChartContainer from "components/charts/ChartContainer/ChartContainer";
import { useFetchData } from "hooks/fetch";
import { useEffect, useState } from "react";
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
  const [historyValue, setHistoryValue] = useState(0);

  const jobsPerOwnerHistory = useFetchData(
    "history/jobs-per-owner",
    {},
    { resolution: 50 }
  );
  let data: { name: string; value: number }[] = [];

  if (jobsPerOwnerHistory) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, ...owners } = jobsPerOwnerHistory[historyValue];
    const toName = toNameValue(owners);
    if (toName) data = toName;
    data = data.sort((a, b) => a.value - b.value).slice(-25);
  }

  useEffect(() => {
    if (jobsPerOwnerHistory) setHistoryValue(jobsPerOwnerHistory.length - 1);
  }, [jobsPerOwnerHistory]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ChartContainer
        title="Jobs submitted per user"
        height={500}
        gradient={["rgb(0,155,217)", "rgb(176,53,139)"]}
      >
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

          <YAxis
            type="number"
            domain={[0, (dataMax: number) => dataMax + 10]}
            tickFormatter={(v) => `${Math.round(v)} jobs`}
          />

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

      {jobsPerOwnerHistory && (
        <>
          <input
            style={{ width: "80%", marginTop: 20 }}
            type="range"
            min={0}
            max={jobsPerOwnerHistory.length - 1}
            value={historyValue}
            step={1}
            onChange={(e) => setHistoryValue(parseInt(e.target.value))}
          />

          <p style={{ color: "rgb(169, 169, 169)" }}>
            Date:{" "}
            {new Date(
              jobsPerOwnerHistory[historyValue].createdAt
            ).toLocaleDateString("en-US")}
          </p>
        </>
      )}
    </div>
  );
};

export default OwnerFrequencyBarChart;
