import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from "./App.module.scss";

// Import header components and assets
import artfxLogo from '../../assets/images/ArtFx---Logo-generique-noir.png';
import Navigation from '../Navigation/Navigation';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

// Import charts
import ProgressFramesChart from '../ProgressFramesChart/ProgressFramesChart';
import ComputeTimeBarChart from '../ComputeTimeBarChart/ComputeTimeBarChart';
import PCStatePieChart from '../PCStatePieChart/PCStatePieChart';
import ProjectDistPieChart from '../ProjectDistPieChart/ProjectDistPieChart';

// Frame validation tool
import FrameValidationTool from '../FrameValidationTool/FrameValidationTool';

const App: React.FC = () => {

  return (
    <Router>

      <header className={styles.header}>
        <h1>Harvest 👨‍🌾🌾</h1>
        <img src={artfxLogo} alt="ArtFX Logo" className={styles.artfxLogo} />
        <Navigation />
        <DarkModeToggle />
      </header>

      <main className={styles.pageContent}>
        <Switch>

          <Route path={`${process.env.PUBLIC_URL}/`} exact render={(props) =>
            <div className={styles.chartGrid}>
              <PCStatePieChart />
              <ProjectDistPieChart />
            </div>
          } />

          <Route path={`${process.env.PUBLIC_URL}/projects`} exact render={(props) =>
            <div>
              <ProgressFramesChart />
              <ComputeTimeBarChart />
            </div>
          } />

          <Route
            path={`${process.env.PUBLIC_URL}/project/:projectName`}
            exact
            component={FrameValidationTool}
          />

        </Switch>
      </main>

    </Router>
  );
};

export default App;
