import { BladeStatus } from "types/api";
import { Group } from "types/fog";
import { getBladeStatus } from "utils/tractor";

import { useBladesQuery } from "../BladesQueryContext";
import styles from "./BladesGroup.module.scss";
import BladeSquare from "./BladeSquare";

interface BladesGroupProps {
  statusFilter?: BladeStatus;
  group: Group;
  showUnknown?: boolean;
  hostnameSearch?: string;
}

const BladesGroup = ({
  group,
  statusFilter,
  showUnknown,
  hostnameSearch,
}: BladesGroupProps): JSX.Element => {
  const { blades } = useBladesQuery();

  if (!blades) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <p className={styles.headerText}>{group.name}</p>

      <div className={styles.bladesContainer}>
        {Object.values(group.hosts)
          .filter((host) =>
            blades[host.name] && statusFilter
              ? getBladeStatus(blades[host.name]) === statusFilter
              : true
          )
          .filter((host) =>
            showUnknown ? true : blades[host.name] !== undefined
          )
          .filter((host) =>
            hostnameSearch
              ? host.name.includes(hostnameSearch.toLowerCase())
              : true
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((host) => (
            <BladeSquare key={host.id} blade={blades[host.name]} host={host} />
          ))}
      </div>
    </div>
  );
};

export default BladesGroup;
