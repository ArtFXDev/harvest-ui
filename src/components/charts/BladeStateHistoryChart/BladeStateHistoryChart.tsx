import React, { useState, useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

// Global import
import { PROJECTS, STATES } from 'global.d';

// Utility
import ChartContainer from 'components/charts/ChartContainer/ChartContainer';
import DateUtils from "utils/date-utils";
import DateSelector from '../DateSelector/DateSelector';


const BladeStateHistoryChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 604800000));
  const [endDate, setEndDate] = useState<Date>(new Date());

  /**
   * Get data from api
   */
  const fetchData = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/graphics/blade-status').then((response) => {
      return response.json();
    }).then((json) => {

      json = json.filter((d: any) => d.timestamp > (+ new Date(2021, 2, 26)));

      json.forEach((d: any) => {
        const totalComputers = STATES.map(state => d[state]).reduce((e, acc) => acc + e, 0);
        d.totalComputers = totalComputers;
        STATES.forEach(state => d[state] = (d[state] / totalComputers) * 100);
      });

      setData(json);

    }).catch((error) => {
      setData(undefined);
    });
  }

  // Fetch data when the project changes
  useEffect(() => {
    fetchData();
  }, []);

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
        }}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          type="number"
          dataKey="timestamp"
          domain={['minData', 'maxData']}
          tickFormatter={DateUtils.timestampToMMDDYYY}
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

        {/* Project data curve */}
        {data && (data.length !== 0) &&
          ["free", "busy", "nimby", "off"].map((e, i) => {
            return <Line
              type="linear"
              dataKey={e}
              key={`blade-history-${i}`}
              strokeWidth={3}
              stroke={PROJECTS[i].color}
              dot={false}
            />
          })
        }

        <Tooltip
          formatter={(percent: number, _key: string, sample: any) => {
            return `${Math.round((percent / 100) * sample.payload.totalComputers)} computers`;
          }}
          labelFormatter={t => new Date(t).toString()}
        />

        <Legend />

      </LineChart>

    </ChartContainer>
  )
};

export default BladeStateHistoryChart;
