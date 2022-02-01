import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import AnimatedNumber from "animated-number-react";

import ChartContainer from "components/charts/ChartContainer/ChartContainer";

import {
  PROJECTS,
  Project,
  getTotalFrames,
  startTime,
  deadline,
} from "global.d";

import DateUtils from "utils/date-utils";

import styles from "./ProjectsProgressChart.module.scss";

const ProjectsProgressChart: React.FC = () => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  /**
   * Get data from api
   */
  const fetchData = async () => {
    fetch(process.env.REACT_APP_API_URL + "/graphics/progression")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // Normalize values
        for (const project of PROJECTS) {
          for (const sample of json) {
            sample[project.name] =
              (sample[project.name] / project.totalFrames) * 100;
          }
        }

        // Add today's sample data
        if (json.length !== 0) {
          const lastData = json[json.length - 1];

          if (lastData.timestamp !== Date.now()) {
            json.push({ ...lastData, timestamp: Date.now() });
          }
        }

        setData(json);
      })
      .catch((error) => {
        setData(undefined);
      });
  };

  // Return the total number of validated frames
  const getTotalValidatedFrames = (): number => {
    const lastData = data![data!.length - 1];

    return Math.round(
      PROJECTS.map(
        (project: Project) =>
          (lastData[project.name] / 100) * project.totalFrames
      ).reduce((acc: number, e: number) => acc + e, 0)
    );
  };

  // Fetch data at component mount
  useEffect(() => {
    fetchData();
  }, []);

  const daysFromDeadline = DateUtils.dateDiffDays(new Date(), deadline);

  return (
    <ChartContainer
      title="Global project progression"
      right={
        <>
          {/* End date info */}
          <p>
            Deadline :{" "}
            <span className={styles.deadline}>
              {DateUtils.dateToMMDDYYYY(deadline)} ({daysFromDeadline}d{" "}
              {daysFromDeadline >= 0 ? "left" : "late"})
            </span>
          </p>

          {/* Total frames */}
          {data && data.length !== 0 && (
            <p>
              Total progress :
              <span className={styles.totalFrames}>
                <AnimatedNumber
                  value={getTotalValidatedFrames()}
                  delay={100}
                  formatValue={(value: number) => value.toFixed(0)}
                />
                {` / ${getTotalFrames()}`}
              </span>
            </p>
          )}
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
        }}
      >
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
          tickFormatter={(value) => `${value}%`}
          label={{
            value: "% of frames rendered",
            angle: "-90",
            position: "insideLeft",
            textAnchor: "middle",
          }}
        />

        {data &&
          data.length !== 0 &&
          PROJECTS.map((project) => {
            return (
              <Line
                key={project.name}
                type="linear"
                dataKey={project.name}
                strokeWidth={3}
                stroke={project.color}
                dot={false}
              />
            );
          })}

        {/* Format tooltip with the real number of frames */}
        <Tooltip
          formatter={(value: any, projectName: any) => {
            const totalFrames =
              (PROJECTS as any | undefined).find(
                (pr: Project) => pr.name === projectName
              ).totalFrames ?? 1;
            return `${Math.floor((value / 100) * totalFrames)} frames`;
          }}
          labelFormatter={DateUtils.timestampToMMDDYYYY}
        />

        <Legend />

        <ReferenceLine
          x={deadline.getTime()}
          stroke="rgba(255, 0, 0)"
          strokeDasharray="3 3"
        />

        <ReferenceLine
          label="Goal"
          stroke="red"
          strokeDasharray="3 3"
          segment={[
            { x: startTime.getTime(), y: 0 },
            { x: deadline.getTime(), y: 100 },
          ]}
          ifOverflow="extendDomain"
        />
      </LineChart>
    </ChartContainer>
  );
};

export default ProjectsProgressChart;
