import CurrentBladeUsagePieChart from "components/charts/BladeStatePieChart/BladeStatePieChart";
import CurrentProjectUsagePieChart from "components/charts/CurrentProjectUsagePieChart/CurrentProjectUsagePieChart";
import FarmCurrentUsageChart from "components/charts/FarmCurrentUsageChart/FarmCurrentUsageChart";
import NumberStats from "components/NumberStats/NumberStats";
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

    <FarmCurrentUsageChart />

    {/*<hr />

    <FarmTotalComputeTime />

    <hr />

    <FarmUsageStackAreaChart />

    <hr />

    <FarmUsageChart />*/}
  </>
);

export default HomePage;
