import React, { useState, useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

// Global import
import { PROJECTS } from 'global.d';

// Utility
import ChartContainer from 'components/charts/ChartContainer/ChartContainer';
import DateUtils from "utils/date-utils";


const ProjectsHistoryChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  /**
   * Get data from api
   */
  const fetchData = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/stats/projects-history').then((response) => {
      return response.json();
    }).then((json) => {

      setData(json);

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
