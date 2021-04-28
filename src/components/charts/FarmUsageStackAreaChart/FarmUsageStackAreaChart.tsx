import React, { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

// Global import
import { PROJECTS, STATES } from 'global.d';
import DataUtils from 'utils/data-utils';

// Utility
import ChartContainer from 'components/charts/ChartContainer/ChartContainer';
import DateUtils from "utils/date-utils";
import DateSelector from '../DateSelector/DateSelector';


const FarmUsageHistoryChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 604800000 / 2.0));
  const [endDate, setEndDate] = useState<Date>(new Date());

  /**
   * Get data from api
   */
  const fetchData = async () => {
    const baseRoute: string = `${process.env.REACT_APP_API_URL}/graphics/blade-status`;
    const parameters: string = `start=${startDate!.getTime()}&end=${endDate!.getTime()}`;
    const url: string = `${baseRoute}?${parameters}`;

    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      setData(DataUtils.normalizeDataToPercent(DataUtils.sortByKey(json, "time"), STATES));
    }).catch((error) => {
      setData(undefined);
    });
  }

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

      <AreaChart
        width={800}
        height={500}
        data={data}
        className="chart"
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          type="number"
          dataKey="timestamp"
          domain={['dataMin', 'dataMax']}
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

        {data && (data.length !== 0) &&
          ["off", "nimby", "free", "busy"].map((e, i) => {
            const stateIndex = STATES.indexOf(e);
            return <Area
              type="monotone"
              dataKey={e}
              stackId="1"
              key={`blade-history-${i}`}
              strokeWidth={3}
              stroke={PROJECTS[stateIndex].color}
              fill={PROJECTS[stateIndex].color}
              dot={false}
            />
          })
        }

        <Tooltip
          formatter={(percent: number, _key: string, sample: any) => {
            return `${Math.round((percent / 100) * sample.payload.total)} computers`;
          }}
          labelFormatter={(t: number) => `${DateUtils.timestampToMMDDYYYY(t)} at ${DateUtils.timestampToMMHH(t)}`}
        />

        <Legend />

      </AreaChart>

    </ChartContainer>
  )
};

export default FarmUsageHistoryChart;
