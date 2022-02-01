import BladeStatePieChart from "components/charts/BladeStatePieChart/BladeStatePieChart";
import ProjectDistPieChart from "components/charts/CurrentProjectUsagePieChart/CurrentProjectUsagePieChart";
/* import FarmUsageHistoryChart from 'components/charts/FarmUsageHistoryChart/FarmUsageHistoryChart'; */
// Components
import NumberStats from "components/NumberStats/NumberStats";
import React from "react";
import FadeIn from "react-fade-in";

import styles from "./HomePage.module.scss";

const HomePage = (): JSX.Element => (
  <>
    <FadeIn className={styles.pieCharts} transitionDuration={1500}>
      <BladeStatePieChart />
      <ProjectDistPieChart />
    </FadeIn>

    <hr />

    <NumberStats />

    {/* <hr />

    <FarmCurrentUsageChart />

    <hr />

    <FarmTotalComputeTime />

    <hr />

    <FarmUsageStackAreaChart />

    <hr />

    <FarmUsageChart /> */}
  </>
);

export default HomePage;
