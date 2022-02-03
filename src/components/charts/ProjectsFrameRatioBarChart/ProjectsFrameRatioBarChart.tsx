import ChartContainer from "components/charts/ChartContainer/ChartContainer";
import { PROJECTS } from "global.d";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * Average frame computation time / computer type / project
 */
const ProjectsFrameRatioBarChart = (): JSX.Element => {
  const [data, setData] = useState<Array<any> | undefined>([]);

  const fetchData = async () => {
    fetch(process.env.REACT_APP_API_URL + "/graphics/frame-computed")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        setData(undefined);
      });
  };

  // Fetch data at component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChartContainer
      title="Frames validated / rendered"
      color="white"
      gradient={[PROJECTS[2].color, PROJECTS[0].color]}
    >
      <BarChart
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

        <XAxis dataKey="project" />

        <YAxis
          type="number"
          label={{
            value: "Frames",
            angle: "-90",
            position: "insideLeft",
            textAnchor: "middle",
          }}
        />

        <Tooltip formatter={(d: number) => `${d} frames`} />
        <Legend />

        <Bar dataKey="valid" stackId="a" fill={PROJECTS[0].color} />
        <Bar dataKey="rendered" stackId="a" fill={PROJECTS[2].color} />
      </BarChart>
    </ChartContainer>
  );
};

export default ProjectsFrameRatioBarChart;
