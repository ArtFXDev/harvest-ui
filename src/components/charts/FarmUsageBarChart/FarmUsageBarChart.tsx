import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { PROJECTS } from 'global.d';

import DateUtils from 'utils/date-utils';
import ChartContainer from 'components/charts/ChartContainer/ChartContainer';

import styles from './FarmUsageBarChart.module.scss';

interface UsageProps {
  data: any;
  dataKey: string;
  fillColor: string;
  maxValue: number;
}


const STATES: Array<string> = ["free", "busy", "nimby", "off"];

/**
 * Area chart component
 */
const AreaChartUsage: React.FC<UsageProps> = (props: UsageProps) => {
  /**
   * Return tooltip format for hour or day
   */
  const getDataText = (i: number) => {
    if (props.maxValue === 24) {
      return `${i}h`;
    } else {
      return ['monday', 'tuesday', 'wendnesday', 'thursday', 'friday', 'saturday', 'sunday'][i];
    }
  }

  /**
  * Return the current value for the hour or day
  */
  const getReferenceLineValue = () => {
    const now = new Date();

    if (props.maxValue === 24) {
      return now.getHours() + now.getMinutes() / 60.0;
    } else {
      console.log(now.getDay() + now.getHours() / 24.0);
      return now.getDay() - 1 + now.getHours() / 24.0;
    }
  }

  return (
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
          domain={[0, props.maxValue - 1]}
          height={50}
          tickCount={props.maxValue}
          tickFormatter={(i: number) => getDataText(i)}
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

        {/* Line for today */}
        <ReferenceLine x={getReferenceLineValue()} stroke="rgba(255, 0, 0, 0.3)" />

        <Tooltip
          formatter={(percent: number, _key: string, sample: any) => {
            return `${Math.round((percent / 100) * sample.payload.totalComputers)} computers`;
          }}
          labelFormatter={getDataText}
        />

        <Legend />

      </AreaChart>
    </ResponsiveContainer>
  );
};


/**
 * Average values of the usage of the farm over a day
 */
const FarmUsageBarChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2021, 2, 24));
  const [period, setPeriod] = useState<string>("hours");

  const today: Date = new Date();
  const [endDate, setEndDate] = useState<Date | undefined>(today);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_URL}/stats/farm-history/${period}?start=${startDate!.getTime()}&end=${endDate!.getTime()}`;

    await fetch(url).then((response) => {
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

  // Fetch data when modifying selection options
  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate, period]);

  return (
    <ChartContainer
      title={`Farm average usage over a ${period === 'hours' ? 'day' : 'week'}`}
      responsive={false}
      right={
        <>
          {/* Start date input */}
          <label htmlFor="start">Start date:</label>
          <div>
            <input type="date" id="start" name="start-date"
              value={startDate ? DateUtils.dateToYYYYMMDD(startDate) : ''}
              onChange={d => setStartDate(d.target.valueAsDate!)}
            />
          </div>

          {/* End date input */}
          <label htmlFor="end">End date:</label>
          <div>
            <input type="date" id="end" name="end-date"
              value={endDate ? DateUtils.dateToYYYYMMDD(endDate) : ''}
              max={DateUtils.dateToYYYYMMDD(today)}
              onChange={d => setEndDate(d.target.valueAsDate!)}
            />
          </div>

          {/* Time scale input */}
          <label htmlFor="period">Period: </label>

          <select
            name="period"
            id="period-select"
            value={period}
            onChange={e => setPeriod(e.target.value)}
          >
            <option value="hours">day</option>
            <option value="days">week</option>
          </select>
        </>
      }
    >

      <div className={styles.chartGrid}>
        {data &&
          STATES.map((dataKey: string, i: number) => {
            return <div className={styles.chartUsage} key={`farm-usage-${i}`}>
              <AreaChartUsage
                data={data}
                dataKey={dataKey}
                fillColor={PROJECTS[i].color}
                maxValue={period === "hours" ? 24 : 7}
              />
            </div>
          })
        }
      </div>

    </ChartContainer>
  )
};

export default FarmUsageBarChart;
