import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';

import { PROJECTS } from 'global.d';

import DateUtils from 'utils/date-utils';

import ChartContainer from '../ChartContainer/ChartContainer';
import DateSelector from '../DateSelector/DateSelector';

/**
 * A chart showing the farm usage in a more explicit way
 * by not considering nimby and off computers
 */
const FarmCurrentUsage: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  // Initialize at today midnight
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 86400000));

  // End now
  const [endDate, setEndDate] = useState<Date>(new Date());

  const fetchData = async () => {
    const baseRoute: string = `${process.env.REACT_APP_API_URL}/graphics/blade-status`;
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
        return { busy: (d.busy / totalComputers) * 100, totalComputers: totalComputers, timestamp: d.timestamp };
      });

      setData(onlyBusy);

      console.log(onlyBusy);
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
      title={`Farm current usage (${(data && data.length !== 0) ? Math.floor(data[data.length - 1].busy) : "?"}%)`}
      height={300}
      color="white"
      backgroundColor={PROJECTS[1].color}
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
          dataKey="timestamp"
          domain={['dataMin', (dataMax: number) => dataMax + 86400000]}
          height={50}
          tickCount={24}
          tickFormatter={(i: number) => DateUtils.timestampToMMHH(i).slice(0, -2)}
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
          x={Date.now()}
          stroke="rgba(255, 0, 0, 0.3)"
        />

        <Tooltip
          formatter={(percent: number, _key: string, sample: any) => {
            return `${Math.round((percent / 100) * sample.payload.totalComputers)} / ${sample.payload.totalComputers} available computers`;
          }}
          labelFormatter={(i: number) => `${DateUtils.timestampToMMDDYYYY(i)} at ${DateUtils.timestampToMMHH(i)}`}
        />

        <Legend />

      </AreaChart>

    </ChartContainer>
  )
};

export default FarmCurrentUsage;