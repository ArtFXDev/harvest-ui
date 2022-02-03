import ChartContainer from "components/charts/ChartContainer/ChartContainer";
import DateSelector from "components/common/DateSelector/DateSelector";
import { PROJECTS } from "global.d";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as DateUtils from "utils/date-utils";

const ProjectsHistoryChart = (): JSX.Element => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  // Start date one day ago
  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() - 86400000)
  );

  // Until now
  const [endDate, setEndDate] = useState<Date>(new Date());

  /**
   * Get data from api
   */
  const fetchData = async () => {
    const baseRoute = `${process.env.REACT_APP_API_URL}/stats/projects-history`;
    const parameters = `start=${startDate!.getTime()}&end=${endDate!.getTime()}`;
    const url = `${baseRoute}?${parameters}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(json.filter((d: any) => d.time > +new Date(2021, 2, 24)));
      })
      .catch((error) => {
        setData(undefined);
      });
  };

  // Fetch data when the project changes
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

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
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          type="number"
          dataKey="time"
          domain={["dataMin", "dataMax"]}
          tickFormatter={DateUtils.timestampToMMDDYYYY}
          height={50}
          label={{
            value: "Time",
            position: "insideBottom",
          }}
        />

        <YAxis
          type="number"
          domain={[0, 50]}
          tickFormatter={(value) => `${value} computers`}
        />

        {/* Curve for each project */}
        {data &&
          data.length !== 0 &&
          PROJECTS.map((project) => {
            return (
              <Line
                key={project.name}
                type="monotone"
                dataKey={project.name}
                strokeWidth={3}
                stroke={project.color}
                dot={false}
              />
            );
          })}

        <Tooltip
          labelFormatter={(t: number) =>
            `${DateUtils.timestampToMMDDYYYY(t)} at ${DateUtils.timestampToMMHH(
              t
            )}`
          }
        />

        <Legend />
      </LineChart>
    </ChartContainer>
  );
};

export default ProjectsHistoryChart;
