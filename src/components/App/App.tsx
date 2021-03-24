import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from "./App.module.scss";

// Import header components and assets
import artfxLogo from 'assets/images/ArtFx---Logo-generique-noir.png';
import Navigation from 'components/Navigation/Navigation';
import DarkModeToggle from 'components/DarkModeToggle/DarkModeToggle';

// Import charts
import ChartContainer from 'components/charts/ChartContainer/ChartContainer';
import ProgressFramesChart from 'components/charts/ProgressFramesChart/ProgressFramesChart';
import PCStatePieChart from 'components/charts/PCStatePieChart/PCStatePieChart';
import ProjectDistPieChart from 'components/charts/ProjectDistPieChart/ProjectDistPieChart';
import ProjectProgressChart from 'components/charts/ProjectProgressChart/ProjectProgressChart';
import FarmUsageBarChart from 'components/charts/FarmUsageBarChart/FarmUsageBarChart';

// Frame validation tool
import FrameValidationTool from 'components/FrameValidationTool/FrameValidationTool';


/**
 * Main application component, contains the router and all the routes
 */
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

          <Route path={`${process.env.PUBLIC_URL}/`} exact render={() =>
            <>
              <div className={styles.pieCharts}>
                <PCStatePieChart />
                <ProjectDistPieChart />
              </div>

              <hr/>

              <ChartContainer title="Farm average usage over a day">
                <FarmUsageBarChart />
              </ChartContainer>
            </>
          } />

          <Route path={`${process.env.PUBLIC_URL}/projects`} exact render={() =>
              <ProgressFramesChart />
          } />

          {/* Validation tool */}
          <Route
            path={`${process.env.PUBLIC_URL}/project/:projectName`}
            exact
            render={(props: any) =>
              <div>
                <ProjectProgressChart {...props} />
                <hr />
                <FrameValidationTool {...props} />
              </div>
            }
          />

        </Switch>

      </main>

    </Router>
  );
};

export default App;
