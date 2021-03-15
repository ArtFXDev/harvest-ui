// Import third-party
import React, { useState, useEffect } from 'react';
import { match } from 'react-router';
import { ResponsiveContainer, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ReferenceLine } from 'recharts';

import { PROJECTS, Project, projectNameToUpperCase} from "../../global.d";

// import sytle
import styles from './ProjectProgressChart.module.scss';

// Initialise dates
const startTime = (+ new Date(2021, 2, 0));
const deadline = (+ new Date(2021, 5, 2));


 // Format timestamp to MM/DD/YYYY
function formatTimestamp(unixTime: number): string {
    return (new Date(unixTime)).toLocaleDateString("en-US");
}

// Interface to get the route string
interface RouteParams {
    projectName: string;
}

interface Props {
    match?: match<RouteParams>;
}

// Create a graph out of the api data using recharts
const ProjectProgressChart: React.FC<Props> = (props) => {
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [data, setData] = useState<Array<any> | undefined>([]);
  const [endDate, setEndDate] = useState<Date>(new Date(deadline));
  const totalFrames = PROJECTS.filter(p => p.name === projectNameToUpperCase(props.match!.params.projectName))[0].totalFrames

  /**
   * Get data from api
   */
  const fetchData = async () => {
    const result = await fetch(process.env.REACT_APP_API_URL + '/graphics/progression/' + props.match!.params.projectName).then((response) => {
      return response.json();
    }).then((json) => {

      // Normalize values
        for (const sample of json) {
          sample[props.match!.params.projectName.toUpperCase().replace("-", "_")] = (sample[projectNameToUpperCase(props.match!.params.projectName)] / totalFrames) * 100;
        }

      setData(json);
    }).catch((error) => {
      setData(undefined);
    });
  }

  // Fetch data at component mount
  // Pass the props as parameter to force update when switching routes
  useEffect(() => {
    fetchData();
  }, [props.match!.params.projectName]);

  return (
    <div className="chartContainerWide">

      {/* End date selector */}
      <label htmlFor="start" className={styles.dateSelector}>End date:</label>
      <input type="date" id="endDate" name="end-date"
        value={endDate.toISOString().substr(0, 10)}
        onChange={event => setEndDate(new Date(event.target.value))}
      />

      <ResponsiveContainer width="100%" height="100%">
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
            domain={[startTime, endDate.getTime()]}
            dataKey="timestamp"
            tickFormatter={formatTimestamp}
            scale="linear"
            interval="preserveStartEnd"
            label={{
              value: "Time",
              position: "insideBottom",
            }}
          />

          <YAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={value => `${value}%`}
            label={{
              value: "% of frames rendered",
              angle: "-90",
              position: "insideLeft",
              textAnchor: "middle"
            }}
          />

          {/* Prevent curves from rendering when data not fully loaded
              See : https://stackoverflow.com/questions/49756463/rechart-animation-for-linechart-bringing-in-lines-from-right-side */}
          {data && (data.length !== 0) &&
            PROJECTS.filter(p => projectFilter === "all" || p.name === projectFilter)
              .map((project, index) => {
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

          {/* Format tooltip with the real number of frames */}
          <Tooltip
            formatter={(value: any, projectName: any) => {
              // if (PROJECTS === undefined) return;

              const totalFrames = (PROJECTS as any | undefined).find((pr: Project) => pr.name === projectName).totalFrames ?? 1;
              return `${Math.floor((value / 100) * totalFrames)} frames`;
            }}

            labelFormatter={formatTimestamp}
          />

          <ReferenceLine
            label="Goal"
            stroke="red"
            strokeDasharray="3 3"
            segment={[{ x: startTime, y: 0 }, { x: deadline, y: 100 }]}
            ifOverflow="extendDomain"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
};

export default ProjectProgressChart;
