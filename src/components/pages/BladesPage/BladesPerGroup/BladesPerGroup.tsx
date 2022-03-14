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
  const [unknownBlades, setUnknownBlades] = useState<boolean>(false);
  const [hostnameSearch, setHostnameSearch] = useState<string>();

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
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={hostnameSearch}
          onChange={(e) => setHostnameSearch(e.target.value)}
        />

        <div>
          <div>
            <div
              className={styles.statusButton}
              style={{
                backgroundColor: unknownBlades ? "rgb(85, 85, 85)" : "",
                color: unknownBlades ? "white" : "rgb(85, 85, 85)",
                borderColor: "rgb(85, 85, 85)",
              }}
              key={status}
              onClick={() => {
                setUnknownBlades((old) => !old);
              }}
            >
              Unknown
            </div>
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
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {groups &&
          Object.values(groups)
            .filter((g) => g.name.length > 0)
            .filter((g) =>
              hostnameSearch
                ? Object.values(g.hosts).some((host) =>
                    host.name.includes(hostnameSearch.toLowerCase())
                  )
                : true
            )
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((group, i) => (
              <FadeIn
                key={group.id}
                transitionDuration={600 * Math.random()}
                delay={i * 20}
              >
                <BladesGroup
                  group={group}
                  statusFilter={statusFilter}
                  showUnknown={unknownBlades}
                  hostnameSearch={hostnameSearch}
                />
              </FadeIn>
            ))}
      </div>

      <ReactTooltip id="blades-grid" effect="solid" />
    </div>
  );
};

export default BladesPerGroup;
