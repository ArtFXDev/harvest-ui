import CurrentBladeUsagePieChart from "components/charts/BladeStatePieChart/BladeStatePieChart";
import BladeUsageHistoryStackAreaChart from "components/charts/BladeUsageHistoryStackAreaChart/BladeUsageHistoryStackAreaChart";
import CurrentProjectUsagePieChart from "components/charts/CurrentProjectUsagePieChart/CurrentProjectUsagePieChart";
import FarmBusyUsageHistoryChart from "components/charts/FarmBusyUsageHistoryChart/FarmBusyUsageHistoryChart";
import NumberStats from "components/pages/HomePage/NumberStats/NumberStats";
import FadeIn from "react-fade-in";

import styles from "./HomePage.module.scss";

const HomePage = (): JSX.Element => (
  <>
    <FadeIn className={styles.pieCharts} transitionDuration={1500}>
      <CurrentBladeUsagePieChart />
      <CurrentProjectUsagePieChart />
    </FadeIn>
    <hr />
    <NumberStats />
    <hr />
    <FarmBusyUsageHistoryChart />
    <hr />
    <BladeUsageHistoryStackAreaChart />
  </>
);

export default HomePage;
