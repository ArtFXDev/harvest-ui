import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.scss";

const links: { route: string; text: string }[] = [{ route: "/", text: "Farm" }];

/**
 * Navbar component
 */
const Navigation = (): JSX.Element => {
  return (
    <nav className={styles.mainNav}>
      {/* Main links */}
      <ul>
        {links.map((link) => (
          <li key={link.route}>
            <NavLink
              to={link.route}
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
