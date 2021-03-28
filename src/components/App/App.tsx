import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from "./App.module.scss";

// Import header components and assets
import artfxLogo from 'assets/images/ArtFx---Logo-generique-noir.png';
import Navigation from 'components/Navigation/Navigation';
import DarkModeToggle from 'components/DarkModeToggle/DarkModeToggle';

// Import pages (use lazy loading)
const HomePage = React.lazy(() => import('components/pages/HomePage/HomePage'));
const ProjectsPage = React.lazy(() => import('components/pages/ProjectsPage/ProjectsPage'));
const ProjectPage = React.lazy(() => import('components/pages/ProjectPage/ProjectPage'));


/**
 * Main application component, contains the router, the routes and the pages
 */
const App: React.FC = () => {

  // Return the full url with website url
  const fullURL = (path: string): string => `${process.env.PUBLIC_URL}${path}`;

  return (
    <Router>

      <header className={styles.header}>
        <h1>Harvest 👨‍🌾🌾</h1>
        <img src={artfxLogo} alt="ArtFX Logo" className={styles.artfxLogo} />
        <Navigation />
        <DarkModeToggle />
      </header>

      <main className={styles.pageContent}>

        <Suspense fallback={<div>Loading...</div>}>
          <Switch>

            {/* Home page */}
            <Route
              path={fullURL("/")} exact
              component={HomePage}
            />

            {/* Projects page */}
            <Route
              path={fullURL("/projects")} exact
              component={ProjectsPage}
            />

            {/* Project page */}
            <Route
              path={fullURL("/project/:projectName")} exact
              render={(props: any) => (<ProjectPage {...props} />)}
            />

          </Switch>
        </Suspense>

      </main>

    </Router>
  );
};

export default App;
