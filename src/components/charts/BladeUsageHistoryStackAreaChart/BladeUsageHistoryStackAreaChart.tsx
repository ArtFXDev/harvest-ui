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
import { BLADE_STATUSES } from "types/api";
import { BLADE_STATUS_COLOR } from "utils/colors";
import { normalizeToPercentWithTotal } from "utils/data";
import * as DateUtils from "utils/date";

/**
 * Stacked areas of the history of blade statuses
 */
const BladeUsageHistoryStackAreaChart = (): JSX.Element => {
  const [startDate, setStartDate] = useState<number>(
    Date.now() - 604800000 / 2.0
  );
  const [endDate, setEndDate] = useState<number>(Date.now());

  const data = useFetchData(
    "history/blade-usage",
    {},
    { start: startDate, end: endDate }
  );

  const formattedData =
    data &&
    data.map((entry) => {
      const { busy, free, nimby, off, noFreeSlots } = entry;
      const toPercent = normalizeToPercentWithTotal({
        busy,
        free,
        nimby,
        off,
        noFreeSlots,
      });
      return { ...toPercent, createdAt: new Date(entry.createdAt).getTime() };
    });

  return (
    <ChartContainer
      title="Blade usage history"
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
          tickFormatter={DateUtils.timestampToMMDDYYYY}
          height={50}
          label={{
            value: "Time",
            position: "insideBottom",
          }}
        />

        <YAxis
          type="number"
          tickFormatter={(p: number) => `${Math.floor(p)}%`}
          tickCount={6}
          domain={[0, 100]}
        />

        {data &&
          data.length !== 0 &&
          BLADE_STATUSES.slice()
            .reverse()
            .map((status, i) => {
              return (
                <Area
                  type="monotone"
                  dataKey={status}
                  stackId="1"
                  key={`blade-history-${i}`}
                  strokeWidth={3}
                  stroke={BLADE_STATUS_COLOR[status]}
                  fill={BLADE_STATUS_COLOR[status]}
                  dot={false}
                />
              );
            })}

        <Tooltip
          formatter={(
            percent: number,
            _key: string,
            sample: { payload: { total: number } }
          ) => {
            return `${Math.round(
              (percent / 100) * sample.payload.total
            )} computers`;
          }}
          labelFormatter={(t: number) =>
            `${DateUtils.timestampToMMDDYYYY(t)} at ${DateUtils.timestampToMMHH(
              t
            )}`
          }
        />

        <Legend />
      </AreaChart>
    </ChartContainer>
  );
};

export default BladeUsageHistoryStackAreaChart;
