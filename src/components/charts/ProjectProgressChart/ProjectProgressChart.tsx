import React, { useState, useEffect } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ReferenceLine } from 'recharts';

// Global import
import { Project, getProjectFromName, startTime, deadline } from 'global.d';

// Utility
import ChartContainer from 'components/charts/ChartContainer/ChartContainer';
import ProjectUtils from 'utils/project-utils';
import DateUtils from "utils/date-utils";

// Style
import styles from './ProjectProgressChart.module.scss';


// Return project object from lower case name
const getProjectFromLowerCaseName = (projectName: string): Project => {
  return getProjectFromName(ProjectUtils.projectNameToUpperCase(projectName))
}

interface Props {
  projectName: string;
}

/**
 * Graph component : progression curve of a project with deadline
 */
const ProjectProgressChart: React.FC<Props> = (props) => {
  const [data, setData] = useState<Array<any> | undefined>([]);
  const [project, setProject] = useState<Project>(getProjectFromLowerCaseName(props.projectName));

  /**
   * Get data from api
   */
  const fetchData = async () => {
    fetch(process.env.REACT_APP_API_URL + '/graphics/progression/' + props.projectName).then((response) => {
      return response.json();
    }).then((json) => {

      // Normalize values to percentages
      for (const sample of json) {
        sample[project.name] = (sample[project.name] / project.totalFrames) * 100;
      }

      // Add today's sample data
      if (json.length !== 0) {
        const lastData = json[json.length - 1];

        if (lastData.timestamp !== Date.now()) {
          json.push({ ...lastData, timestamp: Date.now() });
        }
      }

      setData(json);

    }).catch((error) => {
      setData(undefined);
    });
  }

  // Return the last number of validated frames
  const getTotalValidatedFrames = (): number => {
    const percent: number = (data!.length !== 0) ? data![data!.length - 1][project.name] : 0;
    return Math.floor((percent / 100) * project.totalFrames);
  }

  // Set the project when switching the route
  useEffect(() => {
    setProject(getProjectFromLowerCaseName(props.projectName));
  }, [props.projectName]);

  // Fetch data when the project changes
  useEffect(() => {
    fetchData();
  }, [project]);

  return (
    <ChartContainer
      title={ProjectUtils.projectNameToReadable(project?.name)}
      color="white"
      backgroundColor={project.color}
      right={
        <>
          {/* End date info */}
          <p>Deadline : <span className={styles.deadline}>{DateUtils.dateToMMDDYYYY(deadline)}</span></p>

          {/* Total frames */}
          {data &&
            <p>
              {(data.length !== 0) && "Total progress :"}
              <span
                className={styles.totalFrames}
                style={{ backgroundColor: project.color }}
              >
                {(data.length !== 0) ? `${getTotalValidatedFrames()} / ${project.totalFrames}` : "No frames validated!"}
              </span>
            </p>
          }
        </>
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
          domain={[startTime.getTime(), deadline.getTime()]}
          dataKey="timestamp"
          tickFormatter={DateUtils.timestampToMMDDYYYY}
          scale="linear"
          interval="preserveStartEnd"
          height={50}
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
            value: "% of frames validated",
            angle: "-90",
            position: "insideLeft",
            textAnchor: "middle"
          }}
        />

        {/* Line for today */}
        <ReferenceLine x={Date.now()} stroke="rgba(255, 0, 0, 0.3)" />

        {/* Project data curve */}
        {data && (data.length !== 0) &&
          <Line
            type="linear"
            dataKey={project.name}
            strokeWidth={3}
            stroke={project.color}
            dot={false}
          />
        }

        {/* Format tooltip with the real number of frames */}
        <Tooltip
          formatter={(percent: any) => {
            const validFrames = Math.floor((percent / 100) * project.totalFrames);
            return `${validFrames}/${project.totalFrames} frames`;
          }}
          labelFormatter={DateUtils.timestampToMMDDYYYY}
        />

        {/* Reference line goal */}
        <ReferenceLine
          label="Goal"
          stroke="red"
          strokeDasharray="3 3"
          segment={[{ x: startTime.getTime(), y: 0 }, { x: deadline.getTime(), y: 100 }]}
          ifOverflow="extendDomain"
        />
      </LineChart>

    </ChartContainer>
  )
};

export default ProjectProgressChart;
