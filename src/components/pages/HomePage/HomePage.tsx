import CurrentBladeUsagePieChart from "components/pages/HomePage/BladeStatePieChart/BladeStatePieChart";
import BladeUsageHistoryStackAreaChart from "components/pages/HomePage/BladeUsageHistoryStackAreaChart/BladeUsageHistoryStackAreaChart";
import CurrentProjectUsagePieChart from "components/pages/HomePage/CurrentProjectUsagePieChart/CurrentProjectUsagePieChart";
import FarmBusyUsageHistoryChart from "components/pages/HomePage/FarmBusyUsageHistoryChart/FarmBusyUsageHistoryChart";
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
