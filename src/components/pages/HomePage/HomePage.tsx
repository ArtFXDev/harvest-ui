import React from "react";
import FadeIn from "react-fade-in";

import styles from "./HomePage.module.scss";

// Components
import FarmUsageChart from "components/charts/FarmUsageChart/FarmUsageChart";
import BladeStatePieChart from "components/charts/BladeStatePieChart/BladeStatePieChart";
import ProjectDistPieChart from "components/charts/CurrentProjectUsagePieChart/CurrentProjectUsagePieChart";
/* import FarmUsageHistoryChart from 'components/charts/FarmUsageHistoryChart/FarmUsageHistoryChart'; */
import FarmCurrentUsageChart from "components/charts/FarmCurrentUsageChart/FarmCurrentUsageChart";
import FarmUsageStackAreaChart from "components/charts/FarmUsageStackAreaChart/FarmUsageStackAreaChart";
import FarmTotalComputeTime from "components/charts/FarmTotalComputeTime/FarmTotalComputeTime";
import NumberStats from "components/NumberStats/NumberStats";

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
