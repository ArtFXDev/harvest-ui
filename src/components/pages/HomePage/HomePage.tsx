import React from 'react';

import styles from './HomePage.module.scss';

// Components
import FarmUsageChart from 'components/charts/FarmUsageChart/FarmUsageChart';
import PCStatePieChart from 'components/charts/PCStatePieChart/PCStatePieChart';
import ProjectDistPieChart from 'components/charts/ProjectDistPieChart/ProjectDistPieChart';
import BladeStateHistoryChart from 'components/charts/BladeStateHistoryChart/BladeStateHistoryChart';

const HomePage: React.FC = () => (
  <>
    <div className={styles.pieCharts}>
      <PCStatePieChart />
      <ProjectDistPieChart />
    </div>

    <hr />

    <FarmUsageChart />

    <hr />

    <BladeStateHistoryChart />
  </>
);

export default HomePage;
