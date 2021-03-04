import React, { useEffect, useState } from 'react';
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import styles from "./PCStatePieChart.module.scss";

import { COLORS } from '../../global.d';

interface Data {
  name: string;
  value: number;
}

/**
 * Distribution of free / busy and nimby on computers in real time on the farm
 */
const PCStatePieChart: React.FC = () => {
  const [data, setData] = useState<Array<Data> | undefined>([]);

  const fetchData = async () => {
    const result = await fetch(process.env.REACT_APP_API_URL + '/pc-work').then((response) => {
      return response.json();
    }).then((json) => {
      setData(json);
    }).catch((error) => {
      setData(undefined);
    });
  }

  // Fetch data at component mount
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    fetchData();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chartContainerSmall">

      <ResponsiveContainer width="99%" minWidth="0">
        <PieChart
          width={250}
          height={250}
          className="chart"
        >

          <Pie
            data={data}
            dataKey="value"
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            labelLine={false}
            label={({ percent, index }) => {
              return (data === undefined) ? "" : `${data[index].name}: ${Math.round(percent * 100)}%`
            }}
            animationDuration={800}
            paddingAngle={5}
            isAnimationActive={true}
          >

            {data &&
              data.map((el, i) => (
                <Cell key={`pcstate-${i}`} fill={COLORS[i]} />
              ))
            }

            <Label
              value="Computer state"
              position="center"
              className={styles.centeredLabel}
            />


          </Pie>

          <Tooltip
            formatter={(e: any) => `${e} computers`}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  )
};

export default PCStatePieChart;
