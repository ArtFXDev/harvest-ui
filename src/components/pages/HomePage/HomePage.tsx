import React from 'react';
import FadeIn from 'react-fade-in';

import styles from './HomePage.module.scss';

// Components
import FarmUsageChart from 'components/charts/FarmUsageChart/FarmUsageChart';
import PCStatePieChart from 'components/charts/PCStatePieChart/PCStatePieChart';
import ProjectDistPieChart from 'components/charts/ProjectDistPieChart/ProjectDistPieChart';
import BladeStateHistoryChart from 'components/charts/BladeStateHistoryChart/BladeStateHistoryChart';

const HomePage: React.FC = () => (
  <>

    <FadeIn className={styles.pieCharts} transitionDuration={1500}>
      <PCStatePieChart />
      <ProjectDistPieChart />
    </FadeIn>

    <hr />

    <FarmUsageChart />

    <hr />

    <BladeStateHistoryChart />
  </>
);

export default HomePage;
