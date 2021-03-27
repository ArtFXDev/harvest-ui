import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import DateUtils from 'utils/date-utils';

import ChartContainer from 'components/charts/ChartContainer/ChartContainer';


/**
 * Average frame computation time / computer type / project
 */
const ComputeTimeBarChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  const fetchData = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/frame-computetime').then((response) => {
      return response.json();
    }).then((json) => {
      setData(json);
    }).catch((error) => {
      setData(undefined);
    });
  }

  // Fetch data at component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Construct array of bars for each mk* computer
  const bars: Array<any> = [];

  // Create bars
  for (let i: number = 4; i <= 11; i++) {
    bars.push(<Bar key={i} dataKey={`MK${i}`} fill={`rgb(${i * 20}, 50, 200)`} />);
  }

  return (
    <ChartContainer
      title="Average frame computation time"
      color="white"
      gradient={["#a032c8", "#5032c8"]}
    >

      <BarChart
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

        <XAxis dataKey="name" />

        <YAxis
          type="number"
          tickFormatter={sec => `${Math.floor(sec / 60)} min`}
          label={{
            value: "Computation time (minutes)",
            angle: "-90",
            position: "insideLeft",
            textAnchor: "middle"
          }}
        />

        <Tooltip formatter={DateUtils.secondsToHms} />
        <Legend />

        {bars}

      </BarChart>

    </ChartContainer >
  )
};

export default ComputeTimeBarChart;
