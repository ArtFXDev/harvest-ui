import React from 'react';
import FadeIn from 'react-fade-in';

import styles from './HomePage.module.scss';

// Components
import FarmUsageChart from 'components/charts/FarmUsageChart/FarmUsageChart';
import BladeStatePieChart from 'components/charts/BladeStatePieChart/BladeStatePieChart';
import ProjectDistPieChart from 'components/charts/ProjectDistPieChart/ProjectDistPieChart';
import BladeStateHistoryChart from 'components/charts/BladeStateHistoryChart/BladeStateHistoryChart';
import BusyBladeChart from 'components/charts/BusyBladeChart/BusyBladeChart';

const HomePage: React.FC = () => (
  <>
    <FadeIn className={styles.pieCharts} transitionDuration={1500}>
      <BladeStatePieChart />
      <ProjectDistPieChart />
    </FadeIn>

    <hr />

    <BusyBladeChart />

    <hr />

    <FarmUsageChart />

    <hr />

    <BladeStateHistoryChart />
  </>
);

export default HomePage;
