import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import styles from "./App.module.scss";

// Import header and footer
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import Loader from 'components/Loader/Loader';


// Import pages (use lazy loading)
const HomePage = React.lazy(() => import('components/pages/HomePage/HomePage'));
const ProjectsPage = React.lazy(() => import('components/pages/ProjectsPage/ProjectsPage'));
const ProjectPage = React.lazy(() => import('components/pages/ProjectPage/ProjectPage'));


// Return the full url with website url
const fullURL = (path: string): string => `${process.env.PUBLIC_URL}${path}`;


/**
 * Main application component, contains the router, the routes and the pages
 */
const App: React.FC = () => (
  <>
    <Router>

      <Header />

      <main className={styles.pageContent}>
        <Suspense fallback={<Loader />}>
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

            {/* Redirect to home when route not known */}
            <Redirect to={fullURL("/")} />

          </Switch>
        </Suspense>
      </main>

    </Router>

    <Footer />
  </>
);

export default App;
