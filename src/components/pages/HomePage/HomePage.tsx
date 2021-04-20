import React from 'react';
import FadeIn from 'react-fade-in';

import styles from './HomePage.module.scss';

// Components
import FarmUsageChart from 'components/charts/FarmUsageChart/FarmUsageChart';
import BladeStatePieChart from 'components/charts/BladeStatePieChart/BladeStatePieChart';
import ProjectDistPieChart from 'components/charts/ProjectDistPieChart/ProjectDistPieChart';
/* import FarmUsageHistoryChart from 'components/charts/FarmUsageHistoryChart/FarmUsageHistoryChart'; */
import FarmCurrentUsageChart from 'components/charts/FarmCurrentUsageChart/FarmCurrentUsageChart';
import FarmUsageStackAreaChart from 'components/charts/FarmUsageStackAreaChart/FarmUsageStackAreaChart';


const HomePage: React.FC = () => (
  <>
    <FadeIn className={styles.pieCharts} transitionDuration={1500}>
      <BladeStatePieChart />
      <ProjectDistPieChart />
    </FadeIn>

    <hr />
    <FarmCurrentUsageChart />
    <hr />
    <FarmUsageStackAreaChart />
    {/* <hr />
        <FarmUsageHistoryChart /> */}
    <hr />
    <FarmUsageChart />
  </>
);

export default HomePage;
