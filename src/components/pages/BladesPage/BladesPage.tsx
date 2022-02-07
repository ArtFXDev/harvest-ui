import FadeIn from "react-fade-in";

import BladesGrid from "./BladesGrid/BladesGrid";
import styles from "./BladesPage.module.scss";
import { ProvideBladesQuery } from "./BladesQueryContext";
import BladeStatsPieChart from "./BladeStatsPieChart/BladeStatsPieChart";
import ProfileUsageBarChart from "./ProfileUsageBarChart/ProfileUsageBarChart";

const BladesPage = (): JSX.Element => (
  <ProvideBladesQuery>
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <BladeStatsPieChart label="CPU cores" sortKey="ncpu" labelAdd="cores" />
        <BladeStatsPieChart
          label="GPU"
          sortKey="gpulabel"
          labelFormat={(name) => {
            const tokens = name.split(" ");
            return tokens.slice(tokens.length >= 4 ? 2 : 1).join(" ");
          }}
        />
      </div>

      <hr />

      <FadeIn transitionDuration={1500}>
        <div className={styles.bladesGrid}>
          <BladesGrid />
        </div>
      </FadeIn>

      <hr />

      <ProfileUsageBarChart />
    </>
  </ProvideBladesQuery>
);

export default BladesPage;
