import { useBladesQuery } from "../BladesQueryContext";

const ProfileUsagePerProjectBarChart = (): JSX.Element => {
  const { blades } = useBladesQuery();

  return (
    <div>Hello</div>
    /*<ChartContainer title="Blade state per pool">
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
      </ChartContainer>*/
  );
};

export default ProfileUsagePerProjectBarChart;
