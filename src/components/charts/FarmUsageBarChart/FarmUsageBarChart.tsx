import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { PROJECTS } from 'global.d';

import ChartContainer from 'components/charts/ChartContainer/ChartContainer';

import styles from './FarmUsageBarChart.module.scss';

interface UsageProps {
  data: any;
  dataKey: string;
  fillColor: string;
}

const STATES: Array<string> = ["free", "busy", "nimby", "off"];

const AreaChartUsage: React.FC<UsageProps> = (props: UsageProps) => (
  <ResponsiveContainer width="99%">
    <AreaChart
      data={props.data}
      className="chart"
      syncId="farm-usage"
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
        dataKey="time"
        domain={[0, 23]}
        height={50}
        tickCount={24}
        tickFormatter={(h: number) => `${h}h`}
      />

      <YAxis
        type="number"
        domain={[0, 100]}
        tickFormatter={(p: number) => `${p}%`}
      />

      <Area
        dataKey={props.dataKey}
        type="monotone"
        stroke={props.fillColor}
        fill={props.fillColor}
      />

      <Tooltip
        formatter={(percent: number, key: string, sample: any) => {
          return `${Math.round((percent / 100) * sample.payload.totalComputers)} computers`;
        }}
        labelFormatter={(h: number) => `${h}h`}
      />
      <Legend />

    </AreaChart>
  </ResponsiveContainer>
);

/**
 * Average values of the usage of the farm over a day
 */
const FarmUsageBarChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  const fetchData = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/stats/blades-history/1616540400').then((response) => {
      return response.json();
    }).then((json) => {

      // The number of total computers may vary over a day
      // Se compute the percentage relative to that value
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

  // Fetch data at component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChartContainer title="Farm average usage over a day" responsive={false}>

      <div className={styles.chartGrid}>
        {data &&
          STATES.map((dataKey: string, i: number) => {
            return <div className={styles.chartUsage} key={`farm-usage-${i}`}>
              <AreaChartUsage
                data={data}
                dataKey={dataKey}
                fillColor={PROJECTS[i].color}
              />
            </div>
          })
        }
      </div>

    </ChartContainer>
  )
};

export default FarmUsageBarChart;
