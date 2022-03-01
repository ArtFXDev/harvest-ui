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
import { BLADE_STATUSES, BladeStatuses } from "types/api";
import { Blade } from "types/tractor";
import { BLADE_STATUS_COLOR } from "utils/colors";
import { getBladeStatus } from "utils/tractor";

import { useBladesQuery } from "../BladesQueryContext";

function bladesIntoProfile(blades: Blade[]) {
  const profiles: {
    [profile: string]: BladeStatuses & {
      name: string;
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
        noFreeSlots: 0,
      };
    }

    profiles[blade.profile].total++;
    profiles[blade.profile][status]++;
  }

  const profilesList = Object.values(profiles).filter((p) => p.name.length > 0);
  return profilesList
    .map((p) => ({
      ...p,
      busy: (p.busy / p.total) * 100,
      free: (p.free / p.total) * 100,
      nimby: (p.nimby / p.total) * 100,
      off: (p.off / p.total) * 100,
      noFreeSlots: (p.noFreeSlots / p.total) * 100,
    }))
    .sort((a, b) => b.total - a.total);
}

const ProfileUsageBarChart = (): JSX.Element => {
  const { blades } = useBladesQuery();
  const profiles = blades && bladesIntoProfile(Object.values(blades));

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

        {BLADE_STATUSES.map((status) => {
          return (
            <Bar
              key={status}
              dataKey={status}
              stackId="a"
              fill={BLADE_STATUS_COLOR[status as keyof BladeStatuses]}
            />
          );
        })}
      </BarChart>
    </ChartContainer>
  );
};

export default ProfileUsageBarChart;
