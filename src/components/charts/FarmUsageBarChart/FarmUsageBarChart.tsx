import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import {PROJECTS} from 'global.d';

/**
 * Average values of the usage of the farm over a day
 */
const FarmUsageBarChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  const fetchData = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/stats/blades-history/1616540400').then((response) => {
      return response.json();
    }).then((json) => {
      setData(json);
      console.log(json);
    }).catch((error) => {
      setData(undefined);
    });
  }

  // Fetch data at component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="chartContainerWide">

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={1000}
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
            dataKey="time"
            domain={[0, 23]}
            height={50}
            label={{
              value: "Hour",
              position: "insideBottom",
            }}
            padding={{ left: 50, right: 50 }}
            tickCount={24}
            tickFormatter={(h: number) => `${h}h`}
          />

          <YAxis
            type="number"
            label={{
              value: "Number of computers",
              angle: "-90",
              position: "insideLeft",
              textAnchor: "middle"
            }}
          />

          <Bar dataKey="busy" stackId="a" fill={PROJECTS[1].color} />
          <Bar dataKey="free"  stackId="a" fill={PROJECTS[0].color} />
          <Bar dataKey="nimby" stackId="a" fill={PROJECTS[2].color} />
          <Bar dataKey="off" stackId="a" fill={PROJECTS[3].color} />

          <Tooltip
            formatter={(avg: number) => `${Math.floor(avg)} computers`}
            labelFormatter={(h: number) => `${h}h` }
          />
          <Legend />

        </BarChart>
      </ResponsiveContainer>
    </div>
  )
};

export default FarmUsageBarChart;
