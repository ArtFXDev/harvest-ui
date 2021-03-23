import React, { useState, useEffect, Fragment } from 'react';
import { match } from 'react-router';
import { ResponsiveContainer, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ReferenceLine } from 'recharts';

import { Project, getProjectFromName, startTime, deadline } from 'global.d';

import ProjectUtils from 'utils/project-utils';
import DateUtils from "utils/date-utils";

import styles from './ProjectProgressChart.module.scss';

// Initialize dates

// Interface to get the route string
interface RouteParams {
  projectName: string;
}

interface Props {
  match?: match<RouteParams>;
}

const getProject = (projectName: string): Project => {
  return getProjectFromName(ProjectUtils.projectNameToUpperCase(projectName))
}


/**
 * Graph component : progression curve of a project with deadline
 */
const ProjectProgressChart: React.FC<Props> = (props) => {
  const [data, setData] = useState<Array<any> | undefined>([]);
  const [project, setProject] = useState<Project>(getProject(props.match!.params.projectName));

  /**
   * Get data from api
   */
  const fetchData = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/graphics/progression/' + props.match!.params.projectName).then((response) => {
      return response.json();
    }).then((json) => {

      // Normalize values to percentages
      for (const sample of json) {
        sample[project.name] = (sample[project.name] / project.totalFrames) * 100;
      }
      setData(json);

    }).catch((error) => {
      console.log(error);
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
    setProject(getProject(props.match!.params.projectName));
  }, [props.match]);

  // Fetch data when the project changes
  useEffect(() => {
    fetchData();
  }, [project]);

  return (
    <Fragment>

      {/* Graph header */}
      <div className={styles.infos}>
        {/* Project name */}
        <div className={styles.containerLeft}>
          <h2 style={{ backgroundColor: project.color }}
            className={styles.projectTitle}>
            {ProjectUtils.projectNameToReadable(project?.name)}
          </h2>
        </div>

        <div className={styles.containerRight}>
          {/* End date info */}
          <p>Deadline : <span className={styles.deadline}>{DateUtils.dateToMMDDYYYY(deadline)}</span></p>

          {/* Total frames */}
          {data &&
            <p>
              Total progress :
            <span
                className={styles.totalFrames}
                style={{
                  backgroundColor: project.color,
                }}
              >
                {`${getTotalValidatedFrames()} / ${project.totalFrames}`}
              </span>
            </p>
          }
        </div>
      </div>

      <div className="chartContainerWide">
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
              domain={[startTime.getTime(), deadline.getTime()]}
              dataKey="timestamp"
              tickFormatter={DateUtils.timestampToMMDDYYY}
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
                value: "% of frames validated",
                angle: "-90",
                position: "insideLeft",
                textAnchor: "middle"
              }}
            />

            {/* Project data curve */}
            {data && (data.length !== 0) &&
              <Line
                type="monotone"
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
              labelFormatter={DateUtils.timestampToMMDDYYY}
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
        </ResponsiveContainer>
      </div>

    </Fragment>
  )
};

export default ProjectProgressChart;
