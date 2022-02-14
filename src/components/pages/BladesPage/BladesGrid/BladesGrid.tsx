import { useEffect } from "react";
import FadeIn from "react-fade-in";
import ReactTooltip from "react-tooltip";
import { BLADE_STATUS_COLOR } from "utils/colors";
import { getBladeStatus } from "utils/tractor";

import { useBladesQuery } from "../BladesQueryContext";
import styles from "./BladesGrid.module.scss";

export const BladesGrid = (): JSX.Element => {
  const { blades } = useBladesQuery();

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <>
      <div className={styles.grid}>
        {blades &&
          Object.values(blades).map((blade, i) => {
            const status = getBladeStatus(blade);
            const tip = `
              <p>${blade.hnm}</p>
              <p>${blade.osname}</p>
              <p>Status: <span style="color: ${BLADE_STATUS_COLOR[status]}">${status}</p>
            `;

            return (
              <FadeIn
                key={i}
                transitionDuration={400 * Math.random()}
                delay={Math.random() * Object.keys(blades).length * 5}
              >
                <div
                  className={styles.cell}
                  data-html={true}
                  data-tip={tip}
                  data-for="blades-grid"
                  style={{
                    backgroundColor: BLADE_STATUS_COLOR[status],
                  }}
                />
              </FadeIn>
            );
          })}
      </div>
      <ReactTooltip id="blades-grid" effect="solid" />
    </>
  );
};

export default BladesGrid;
