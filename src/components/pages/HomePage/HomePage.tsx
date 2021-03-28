import React from 'react';

import styles from './HomePage.module.scss';

// Components
import FarmUsageChart from 'components/charts/FarmUsageChart/FarmUsageChart';
import PCStatePieChart from 'components/charts/PCStatePieChart/PCStatePieChart';
import ProjectDistPieChart from 'components/charts/ProjectDistPieChart/ProjectDistPieChart';

const HomePage: React.FC = () => (
  <>
    <div className={styles.pieCharts}>
      <PCStatePieChart />
      <ProjectDistPieChart />
    </div>

    <hr />

    <FarmUsageChart />
  </>
);

export default HomePage;
