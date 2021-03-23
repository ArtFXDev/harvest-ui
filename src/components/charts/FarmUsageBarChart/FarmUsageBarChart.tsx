import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

/**
 * Average values of the usage of the farm over a day
 */
const FarmUsageBarChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  const fetchData = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/stats/blades-history').then((response) => {
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

          <Tooltip />
          <Legend />

        </BarChart>
      </ResponsiveContainer>
    </div>
  )
};

export default FarmUsageBarChart;
