import Loader from "components/common/Loader/Loader";
import Footer from "components/structure/Footer/Footer";
// Import header and footer
import Header from "components/structure/Header/Header";
import React from "react";
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import styles from "./App.module.scss";

// Import pages (use lazy loading)
const HomePage = React.lazy(() => import("components/pages/HomePage/HomePage"));

const ProjectsPage = React.lazy(
  () => import("components/pages/ProjectsPage/ProjectsPage")
);

const ProjectPage = React.lazy(
  () => import("components/pages/ProjectPage/ProjectPage")
);

/**
 * Main application component, contains the router, the routes and the pages
 */
const App = (): JSX.Element => (
  <>
    <Router>
      <Header />

      <main className={styles.pageContent}>
        <Suspense fallback={<Loader />}>
          <Switch>
            {/* Home page */}
            <Route path="/" exact component={HomePage} />

            {/* Projects page */}
            <Route path="/projects" exact component={ProjectsPage} />

            {/* Project page */}
            <Route
              path="/project/:projectName"
              exact
              render={(props) => <ProjectPage {...props} />}
            />

            {/* Redirect to home when route not known */}
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </main>
    </Router>

    <Footer />
  </>
);

export default App;
