// Utility
import ChartContainer from "components/charts/ChartContainer/ChartContainer";
// Global import
import { PROJECTS, STATES } from "global.d";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as DataUtils from "utils/data-utils";
import * as DateUtils from "utils/date-utils";

import DateSelector from "../DateSelector/DateSelector";

const FarmUsageHistoryChart = (): JSX.Element => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() - 604800000)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());

  /**
   * Get data from api
   */
  const fetchData = async () => {
    const baseRoute = `${process.env.REACT_APP_API_URL}/graphics/blade-status`;
    const parameters = `start=${startDate!.getTime()}&end=${endDate!.getTime()}`;
    const url = `${baseRoute}?${parameters}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(
          DataUtils.normalizeDataToPercent(
            json.filter((d: any) => d.timestamp > +new Date(2021, 2, 26)),
            STATES
          )
        );
      })
      .catch((error) => {
        setData(undefined);
      });
  };

  // Fetch data when changing date selection
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <ChartContainer
      title="Farm usage history"
      right={
        <DateSelector
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      }
    >
      <LineChart
        width={800}
        height={500}
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

        <XAxis
          type="number"
          dataKey="timestamp"
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
          tickFormatter={(p: number) => `${p}%`}
          domain={[0, 100]}
        />

        {/* Line for each computer state */}
        {data &&
          data.length !== 0 &&
          ["free", "busy", "nimby", "off"].map((e, i) => {
            return (
              <Line
                type="linear"
                dataKey={e}
                key={`blade-history-${i}`}
                strokeWidth={3}
                stroke={PROJECTS[i].color}
                dot={false}
              />
            );
          })}

        <Tooltip
          formatter={(percent: number, _key: string, sample: any) => {
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
      </LineChart>
    </ChartContainer>
  );
};

export default FarmUsageHistoryChart;
