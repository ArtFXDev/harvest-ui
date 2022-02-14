import { useFetchData } from "hooks/fetch";
import { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import ReactTooltip from "react-tooltip";
import { BLADE_STATUSES, BladeStatus } from "types/api";
import { BLADE_STATUS_COLOR } from "utils/colors";

import { useBladesQuery } from "../BladesQueryContext";
import BladesGroup from "./BladesGroup";
import styles from "./BladesPerGroup.module.scss";

const BladesPerGroup = (): JSX.Element => {
  const [statusFilter, setStatusFilter] = useState<BladeStatus>();
  const { blades } = useBladesQuery();
  const groups = useFetchData("fog/groups");

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  if (!groups || !blades) return <p>Loading...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <div>
          {BLADE_STATUSES.map((status) => {
            const selected = statusFilter && statusFilter === status;

            return (
              <div
                className={styles.statusButton}
                style={{
                  backgroundColor: selected ? BLADE_STATUS_COLOR[status] : "",
                  color: selected ? "white" : BLADE_STATUS_COLOR[status],
                  borderColor: BLADE_STATUS_COLOR[status],
                }}
                key={status}
                onClick={() => {
                  if (status !== statusFilter) {
                    setStatusFilter(status);
                  } else {
                    setStatusFilter(undefined);
                  }
                }}
              >
                {status}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {groups &&
          Object.values(groups)
            .filter((g) => g.name.length > 0)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((group, i) => (
              <FadeIn
                key={group.id}
                transitionDuration={600 * Math.random()}
                delay={i * 20}
              >
                <BladesGroup group={group} statusFilter={statusFilter} />
              </FadeIn>
            ))}
      </div>

      <ReactTooltip id="blades-grid" effect="solid" />
    </div>
  );
};

export default BladesPerGroup;
