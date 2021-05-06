import React, { useEffect, useState } from "react";
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

import DateUtils from "utils/date-utils";

import ChartContainer from "../ChartContainer/ChartContainer";
import DateSelector from "../DateSelector/DateSelector";

/**
 * A chart showing the farm usage in a more explicit way
 * by not considering nimby and off computers
 */
const FarmTotalComputeTime: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  // Initialize at today midnight
  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() - 86400000 * 7)
  );

  // End now
  const [endDate, setEndDate] = useState<Date>(new Date());

  const fetchData = async () => {
    const baseRoute: string = `${process.env.REACT_APP_API_URL}/stats/history-computetime`;
    const parameters: string = `start=${startDate!.getTime()}&end=${endDate!.getTime()}`;
    const url: string = `${baseRoute}?${parameters}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // Only keep busy computers / busy + free so we have a better idea
        /* const onlyBusy = json.map((d: any) => {
         *   const total: number = Math.floor(d.busy + d.free);
         *   return { busy: (d.busy / total) * 100, total: total, timestamp: d.timestamp };
         * }); */

        setData(json);
      })
      .catch((error) => {
        setData(undefined);
      });
  };

  const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return `${hours} hours ${rest} minutes`;
  };

  // Fetch data when modifying selection options
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <ChartContainer
      title={`Total compute time history`}
      titleParenthesis={`per 24h`}
      height={320}
      color="white"
      backgroundColor="#009bd9"
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
        data={data}
        className="chart"
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
          dataKey="timestamp"
          domain={["dataMin", (dataMax: number) => dataMax + 86400000]}
          height={50}
          scale="linear"
          tickFormatter={(i: number) => {
            const d = new Date(i);
            return `${d.getDate()} ${DateUtils.getMonthName(d)}`;
          }}
        />

        <YAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(minutes: number) => `${Math.floor(minutes / 60)}h`}
        />

        <Area
          dataKey="minutes"
          type="monotone"
          animationDuration={1500}
          stroke="#009bd9"
          fill="#009bd9"
        />

        {/* Line for today */}
        <ReferenceLine x={Date.now()} stroke="rgba(255, 0, 0, 0.3)" />

        <Tooltip
          formatter={(minutes: number) => {
            return `${formatMinutes(minutes)} of render time`;
          }}
          labelFormatter={(t: number) =>
            `${DateUtils.timestampToMMDDYYYY(t)} ${DateUtils.timestampToMMHH(
              t
            )} - ${DateUtils.timestampToMMDDYYYY(
              t + 86400000
            )} ${DateUtils.timestampToMMHH(t)}`
          }
        />

        <Legend />
      </AreaChart>
    </ChartContainer>
  );
};

export default FarmTotalComputeTime;
