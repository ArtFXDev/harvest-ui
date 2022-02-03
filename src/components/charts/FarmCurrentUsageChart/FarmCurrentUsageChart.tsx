import DateSelector from "components/common/DateSelector/DateSelector";
import { useFetchData } from "hooks/fetch";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { last, sum } from "utils/array";
import { COLORS } from "utils/colors";
import * as DateUtils from "utils/date";

import ChartContainer from "../ChartContainer/ChartContainer";

/**
 * Convert an object of statuses to a percent value
 *
 * Ex: {busy: 50, free: 50} -> {total: 100, busy: 50}
 */
function toBusyPercent(
  entry: { busy: number; free: number },
  timestamp: number
) {
  const total = entry.busy + entry.free;

  return {
    total,
    busyPercent: (entry.busy / total) * 100,
    createdAt: timestamp,
  };
}

/**
 * A chart showing the farm usage in a more explicit way
 * by not considering nimby and off computers
 */
const FarmCurrentUsage = (): JSX.Element => {
  // Initialize at today midnight
  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() - 86400000)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());

  const data = useFetchData(
    "history/blade-usage",
    {},
    { start: startDate.getTime(), end: endDate.getTime() }
  );
  const currentBladeUsage = useFetchData("current/blade-usage", {
    interval: 10000,
  });

  const formattedData =
    data &&
    data.map((entry) =>
      toBusyPercent(entry, new Date(entry.createdAt).getTime())
    );

  // Add the current farm usage
  if (currentBladeUsage) {
    formattedData?.push(toBusyPercent(currentBladeUsage, new Date().getTime()));
  }

  const currentHour = new Date().getHours();
  const lastHoursUsage = data
    ? Math.floor(sum(data.map((d) => d.busy)) / data.length)
    : 0;

  const lastDataItem = formattedData && last(formattedData);
  const currentUsagePercent =
    formattedData && lastDataItem ? Math.floor(lastDataItem.busyPercent) : "?";

  return (
    <ChartContainer
      title={`Farm current usage : ${currentUsagePercent}%`}
      titleParenthesis={`${lastHoursUsage}% for the last 24h`}
      height={320}
      color="white"
      backgroundColor={COLORS.red}
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
        className="chart"
        data={formattedData}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="4 3" />

        <XAxis
          type="number"
          dataKey="createdAt"
          height={50}
          scale="linear"
          domain={["dataMin", (dataMax: number) => dataMax + 86400000]}
          tickFormatter={(i: number) =>
            `${DateUtils.timestampToMMHH(i)}${
              new Date(i).getHours() === currentHour ? " (now)" : ""
            }`
          }
        />

        <YAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(p: number) => `${p}%`}
        />

        <Area
          name="busy"
          dataKey="busyPercent"
          type="monotone"
          animationDuration={1500}
          stroke={COLORS.red}
          fill={COLORS.red}
        />

        <ReferenceLine x={Date.now()} stroke="rgba(255, 0, 0, 0.3)" />

        <Tooltip
          formatter={(
            percent: number,
            _key: string,
            sample: { payload: { total: number } }
          ) => {
            const currentBusyPercent = Math.round(
              (percent / 100) * sample.payload.total
            );
            return `${currentBusyPercent} / ${sample.payload.total} computers`;
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

export default FarmCurrentUsage;
