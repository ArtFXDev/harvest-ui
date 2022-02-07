import Loader from "components/common/Loader/Loader";
import Footer from "components/structure/Footer/Footer";
import Header from "components/structure/Header/Header";
import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import styles from "./App.module.scss";

// Import pages (use lazy loading)
const HomePage = React.lazy(() => import("components/pages/HomePage/HomePage"));
const BladesPage = React.lazy(
  () => import("components/pages/BladesPage/BladesPage")
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blades" element={<BladesPage />} />
          </Routes>
        </Suspense>
      </main>
    </Router>

    <Footer />
  </>
);

export default App;
