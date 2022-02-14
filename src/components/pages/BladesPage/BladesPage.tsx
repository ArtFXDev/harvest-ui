import styles from "./BladesPage.module.scss";
import BladesPerGroup from "./BladesPerGroup/BladesPerGroup";
import { ProvideBladesQuery } from "./BladesQueryContext";
import BladeStatsPieChart from "./BladeStatsPieChart/BladeStatsPieChart";
import ProfileUsageBarChart from "./ProfileUsageBarChart/ProfileUsageBarChart";

const BladesPage = (): JSX.Element => (
  <ProvideBladesQuery>
    <>
      <div className={styles.bladesSection}>
        <div className={styles.center}>
          <BladesPerGroup />
        </div>
      </div>

      <hr />

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

      <ProfileUsageBarChart />
    </>
  </ProvideBladesQuery>
);

export default BladesPage;
