import { Cell, Label, Pie, PieChart, Tooltip } from "recharts";
import { Blade } from "types/tractor";
import * as ChartUtils from "utils/chart";
import { getColorFromString } from "utils/colors";

import { useBladesQuery } from "../BladesQueryContext";

function countByKey<K extends keyof Blade & string>(blades: Blade[], key: K) {
  const values: { [key: string]: { name: string; value: number } } = {};

  for (const blade of blades) {
    if (!values[blade[key] as string]) {
      values[blade[key] as string] = {
        name: (blade[key] as string).toString(),
        value: 0,
      };
    }

    values[blade[key] as string].value++;
  }

  return Object.values(values).sort((a, b) => b.value - a.value);
}

interface BladeStatsPieChartProps<K extends keyof Blade> {
  label: string;
  labelAdd?: string;
  labelFormat?: (name: string) => string;
  sortKey: K;
}

const BladeStatsPieChart = <K extends keyof Blade>({
  label,
  labelAdd,
  labelFormat,
  sortKey,
}: BladeStatsPieChartProps<K>): JSX.Element => {
  const { blades } = useBladesQuery();
  const samples = blades && countByKey(Object.values(blades), sortKey);

  return (
    <PieChart width={500} height={300} className="chart">
      <Pie
        data={samples}
        dataKey="value"
        innerRadius="60%"
        outerRadius="80%"
        labelLine={false}
        animationDuration={800}
        paddingAngle={2}
        isAnimationActive={true}
        label={({ index }) => {
          if (!samples) return;
          const originalName = samples[index].name;
          const name = labelFormat ? labelFormat(originalName) : originalName;
          return `${name}${labelAdd ? " " + labelAdd : ""}`;
        }}
      >
        {samples &&
          samples.map((sample) => (
            <Cell key={sample.name} fill={getColorFromString(sample.name)} />
          ))}

        <Label value={label} position="center" className="centeredLabel" />
      </Pie>

      <Tooltip content={ChartUtils.coloredTooltip} />
    </PieChart>
  );
};

export default BladeStatsPieChart;
