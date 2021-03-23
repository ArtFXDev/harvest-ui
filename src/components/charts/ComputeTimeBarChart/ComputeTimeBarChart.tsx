import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


/**
 * Format seconds to [h]:[m]:s
 * See : https://stackoverflow.com/a/37096512/11452044
 */
function secondsToHms(d: number) {
  d = Number(d);
  var m = Math.floor(d / 60);
  var s = Math.floor(d % 3600 % 60);

  var mDisplay = m > 0 ? m + (m === 1 ? " m, " : " m, ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : "empty";
  return mDisplay + sDisplay;
}


/**
 * Average frame computation time / computer type / project
 */
const ComputeTimeBarChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  const fetchData = async () => {
    const result = await fetch(process.env.REACT_APP_API_URL + '/frame-computetime').then((response) => {
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

  for (let i: number = 4; i <= 11; i++) {
    bars.push(<Bar key={i} dataKey={`MK${i}`} fill={`rgb(${i * 20}, 50, 200)`} />);
  }

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

          <Tooltip
            formatter={(seconds: number) => secondsToHms(seconds)}
          />
          <Legend />

          {bars}

        </BarChart>
      </ResponsiveContainer>
    </div>
  )
};

export default ComputeTimeBarChart;
