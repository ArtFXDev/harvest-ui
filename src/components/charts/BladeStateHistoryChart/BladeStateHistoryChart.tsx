import React, { useState, useEffect } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

// Global import
import { PROJECTS } from 'global.d';

// Utility
import ChartContainer from 'components/charts/ChartContainer/ChartContainer';
import DateUtils from "utils/date-utils";


const BladeStateHistoryChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  /**
   * Get data from api
   */
  const fetchData = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/graphics/blade-status').then((response) => {
      return response.json();
    }).then((json) => {

      setData(json.filter((d: any) => d.timestamp > (+ new Date(2021, 2, 26))));

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
          tickFormatter={value => `${value} computers`}
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
          labelFormatter={t => new Date(t).toString()}
        />

      </LineChart>

    </ChartContainer>
  )
};

export default BladeStateHistoryChart;
