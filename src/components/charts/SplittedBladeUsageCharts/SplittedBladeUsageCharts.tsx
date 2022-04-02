import ChartContainer from "components/charts/ChartContainer/ChartContainer";
import DateSelector from "components/common/DateSelector/DateSelector";
import { useFetchData } from "hooks/fetch";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BLADE_STATUSES } from "types/api";
import { BLADE_STATUS_COLOR } from "utils/colors";
import { normalizeToPercentWithTotal } from "utils/data";
import { yesterday } from "utils/date";

import styles from "./SplittedBladeUsageCharts.module.scss";

interface UsageProps {
  data: any;
  dataKey: string;
  fillColor: string;
  maxValue: number;
}

/**
 * Area chart component
 */
const AreaChartUsage = (props: UsageProps): JSX.Element => {
  /**
   * Return tooltip format for hour or day
   */
  const getDataText = (i: number) => {
    if (props.maxValue === 24) {
      return `${i}h`;
    } else {
      return [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ][i];
    }
  };

  /**
   * Return the current value for the hour or day
   */
  const getReferenceLineValue = () => {
    const now = new Date();

    if (props.maxValue === 24) {
      return now.getHours() + now.getMinutes() / 60.0;
    } else {
      return now.getDay() - 1 + now.getHours() / 24.0;
    }
  };

  return (
    <ResponsiveContainer width="99%">
      <AreaChart
        data={props.data}
        className="chart"
        syncId="farm-usage"
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="4 3" />

        <XAxis
          type="number"
          dataKey="createdAt"
          domain={[0, props.maxValue - 1]}
          height={50}
          tickCount={props.maxValue}
          tickFormatter={(i: number) => getDataText(i)}
        />

        <YAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(p: number) => `${p}%`}
        />

        <Area
          dataKey={props.dataKey}
          type="monotone"
          stroke={props.fillColor}
          fill={props.fillColor}
        />

        {/* Line for today */}
        <ReferenceLine
          x={getReferenceLineValue()}
          stroke="rgba(255, 0, 0, 0.3)"
        />

        <Tooltip
          labelFormatter={getDataText}
          formatter={(percent: number, _key: string, sample: any) => {
            return `${Math.round(
              (percent / 100) * sample.payload.total
            )} computers`;
          }}
        />

        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
};

/**
 * Average values of the usage of the farm over a day
 */
const SplittedBladeUsageCharts = (): JSX.Element => {
  const [startDate, setStartDate] = useState<number>(yesterday().getTime());
  const [endDate, setEndDate] = useState<number>(Date.now());
  const [period, setPeriod] = useState<string>("hours");
  const [includeWE, setIncludeWE] = useState<boolean>(true);

  const data = useFetchData(
    "history/blade-usage",
    {}
    // { start: startDate.getDate(), end: endDate.getDate() }
  );

  const formattedData =
    data &&
    data.map((entry) => {
      const { busy, free, nimby, off } = entry;
      const toPercent = normalizeToPercentWithTotal({ busy, free, nimby, off });
      return { ...toPercent, createdAt: new Date(entry.createdAt).getTime() };
    });

  // const fetchData = async () => {
  //   const baseRoute = `${process.env.REACT_APP_API_URL}/stats/farm-history/${period}`;
  //   const parameters = `start=${startDate!.getTime()}&end=${endDate!.getTime()}&${
  //     !includeWE ? "ignore-we=1" : ""
  //   }`;
  //   const url = `${baseRoute}?${parameters}`;

  //   fetch(url)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       setData(
  //         DataUtils.normalizeDataToPercent(
  //           DataUtils.sortByKey(json, "time"),
  //           STATES
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       setData(undefined);
  //     });
  // };

  // // Fetch data when modifying selection options
  // useEffect(() => {
  //   fetchData();
  // }, [startDate, endDate, period, includeWE]);

  return (
    <ChartContainer
      title={`Farm average usage over a ${period === "hours" ? "day" : "week"}`}
      responsive={false}
      right={
        <DateSelector
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          period={period}
          setPeriod={setPeriod}
          includeWE={includeWE}
          setIncludeWE={setIncludeWE}
        />
      }
    >
      {/* Display four charts */}
      <div className={styles.chartGrid}>
        {formattedData &&
          formattedData.length !== 0 &&
          BLADE_STATUSES.map((status, i) => {
            return (
              <div className={styles.chartUsage} key={`farm-usage-${i}`}>
                <AreaChartUsage
                  data={formattedData}
                  dataKey={status}
                  fillColor={BLADE_STATUS_COLOR[status]}
                  maxValue={period === "hours" ? 24 : 7}
                />
              </div>
            );
          })}
      </div>
    </ChartContainer>
  );
};

export default SplittedBladeUsageCharts;
