import ChartContainer from "components/charts/ChartContainer/ChartContainer";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Blade } from "types/tractor";
import { BLADE_STATUS_COLOR } from "utils/colors";
import { getBladeStatus } from "utils/tractor";

import { useBladesQuery } from "../BladesQueryContext";

function bladesIntoProfile(blades: Blade[]) {
  const profiles: {
    [profile: string]: {
      name: string;
      busy: number;
      free: number;
      nimby: number;
      off: number;
      total: number;
    };
  } = {};

  for (const blade of blades) {
    const status = getBladeStatus(blade);

    if (!profiles[blade.profile]) {
      profiles[blade.profile] = {
        name: blade.profile,
        total: 0,
        busy: 0,
        free: 0,
        nimby: 0,
        off: 0,
      };
    }

    profiles[blade.profile].total++;
    profiles[blade.profile][status]++;
  }

  const profilesList = Object.values(profiles);
  return profilesList
    .map((p) => ({
      ...p,
      busy: (p.busy / p.total) * 100,
      free: (p.free / p.total) * 100,
      nimby: (p.nimby / p.total) * 100,
      off: (p.off / p.total) * 100,
    }))
    .sort((a, b) => b.total - a.total);
}

const ProfileUsageBarChart = (): JSX.Element => {
  const { blades } = useBladesQuery();
  const profiles = blades && bladesIntoProfile(blades);

  if (!profiles) return <p>Loading...</p>;

  return (
    <ChartContainer title="Blade state per pool">
      <BarChart
        data={profiles}
        className="chart"
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(value) => `${Math.floor(value)}%`}
        />

        <Tooltip
          formatter={(
            percent: number,
            _key: string,
            sample: { payload: { total: number } }
          ) => {
            return `${Math.round(
              (percent / 100) * sample.payload.total
            )} computers`;
          }}
        />
        <Legend />

        <Bar dataKey="busy" stackId="a" fill={BLADE_STATUS_COLOR.busy} />
        <Bar dataKey="free" stackId="a" fill={BLADE_STATUS_COLOR.free} />
        <Bar dataKey="nimby" stackId="a" fill={BLADE_STATUS_COLOR.nimby} />
        <Bar dataKey="off" stackId="a" fill={BLADE_STATUS_COLOR.off} />
      </BarChart>
    </ChartContainer>
  );
};

export default ProfileUsageBarChart;
