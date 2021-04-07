import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';

import { PROJECTS } from 'global.d';

import ChartContainer from '../ChartContainer/ChartContainer';
import DateSelector from '../DateSelector/DateSelector';

/**
 * A chart showing the farm usage in a more explicit way
 * by not considering nimby and off computers
 */
const BusyBladeChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  // Initialize at today midnight
  const midnight: Date = new Date();
  midnight.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState<Date>(midnight);

  // End now
  const [endDate, setEndDate] = useState<Date>(new Date());

  const fetchData = async () => {
    const baseRoute: string = `${process.env.REACT_APP_API_URL}/stats/farm-history/hours`;
    const parameters: string = `start=${startDate!.getTime()}&end=${endDate!.getTime()}`;
    const url: string = `${baseRoute}?${parameters}`;

    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      // Sort the data
      json.sort((a: any, b: any) => a.time > b.time ? 1 : -1);

      // Only keep busy computers / busy + free so we have a better idea
      const onlyBusy = json.map((d: any) => {
        const totalComputers: number = Math.floor(d.busy + d.free);
        return { busy: (d.busy / totalComputers) * 100, totalComputers: totalComputers, time: d.time };
      });

      setData(onlyBusy);
    }).catch((error) => {
      setData(undefined);
    });
  }

  // Fetch data when modifying selection options
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (

    <ChartContainer
      title="Farm current usage"
      height={300}
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
        data={data}
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
          tickFormatter={(i: number) => `${i}h`}
        />

        <YAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(p: number) => `${p}%`}
        />

        <Area
          dataKey="busy"
          type="monotone"
          stroke={PROJECTS[1].color}
          fill={PROJECTS[1].color}
        />

        {/* Line for today */}
        <ReferenceLine
          x={new Date().getHours() + new Date().getMinutes() / 60.0}
          stroke="rgba(255, 0, 0, 0.3)"
        />

        <Tooltip
          formatter={(percent: number, _key: string, sample: any) => {
            return `${Math.round((percent / 100) * sample.payload.totalComputers)} / ${sample.payload.totalComputers} available computers`;
          }}
          labelFormatter={(i: number) => `${i}h`}
        />

        <Legend />

      </AreaChart>

    </ChartContainer>
  )
};

export default BusyBladeChart;
