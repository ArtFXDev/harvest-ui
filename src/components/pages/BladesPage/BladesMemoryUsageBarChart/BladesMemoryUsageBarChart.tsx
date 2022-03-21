import ChartContainer from "components/charts/ChartContainer/ChartContainer";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS, lerpColor } from "utils/colors";
import { getBladeStatus } from "utils/tractor";

import { useBladesQuery } from "../BladesQueryContext";

const DIVISIONS = 20;
type DataSample = { name: string; free: number; rest: number };

const BladesMemoryUsageBarChart = (): JSX.Element => {
  const { blades } = useBladesQuery();
  let data: DataSample[] = [];
  let maxRAM = 128;

  if (blades) {
    const perRamRange: { [tier: number]: DataSample } = {};
    const allRAMs = Object.values(blades).map((b) => b.mem);
    maxRAM = Math.max(...allRAMs);
    const piece = maxRAM / DIVISIONS;

    for (const blade of Object.values(blades)) {
      const tier = Math.floor(blade.mem / piece);

      if (!perRamRange[tier]) {
        const minBound = tier * piece;
        const maxBound = (tier + 1) * piece;

        perRamRange[tier] = {
          name: `${Math.floor(minBound)}-${Math.floor(maxBound)}`,
          free: 0,
          rest: 0,
        };
      } else {
        const status = getBladeStatus(blade);
        if (status === "free") {
          perRamRange[tier].free++;
        } else {
          perRamRange[tier].rest++;
        }
      }
    }

    data = Object.values(perRamRange);
  }

  return (
    <ChartContainer title="Blade available memory" height={350}>
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

        <XAxis dataKey="name" />
        <YAxis type="number" />

        <Tooltip formatter={(v: string) => `${v} computers`} />

        <Bar dataKey="rest" stackId="a" fill={COLORS.purple}>
          {data.map((sample, i) => (
            <Cell
              key={sample.name}
              fill={lerpColor(
                176,
                53,
                139,
                100,
                53,
                176,
                i / (data ? data.length : 1)
              )}
            />
          ))}
        </Bar>

        <Bar dataKey="free" fill={COLORS.green} stackId="a">
          {data.map((sample) => (
            <Cell key={sample.name} fill={"rgb(21,175,151)"} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default BladesMemoryUsageBarChart;
