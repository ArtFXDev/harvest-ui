import React, { useState, useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

// Global import
import { PROJECTS } from 'global.d';

// Utility
import ChartContainer from 'components/charts/ChartContainer/ChartContainer';
import DateUtils from "utils/date-utils";
import DateSelector from '../DateSelector/DateSelector';


const ProjectsHistoryChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 604800000));
  const [endDate, setEndDate] = useState<Date>(new Date());

  /**
   * Get data from api
   */
  const fetchData = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/stats/projects-history').then((response) => {
      return response.json();
    }).then((json) => {

      setData(json.filter((d: any) => d.time > (+ new Date(2021, 2, 24))));

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
      title="Project usage history"
      right={
        <DateSelector
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      }
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
          dataKey="time"
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
          PROJECTS.map(project => {
            return <Line
              key={project.name}
              type="monotone"
              dataKey={project.name}
              strokeWidth={3}
              stroke={project.color}
              dot={false}
            />
          })
        }

        <Tooltip
          labelFormatter={t => new Date(t).toString()}
        />

        <Legend />
      </LineChart>

    </ChartContainer>
  )
};

export default ProjectsHistoryChart;
