import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.scss";

interface LinkProps {
  route: string;
  text: string;
}

const Link = (props: LinkProps): JSX.Element => (
  <NavLink
    to={`${process.env.PUBLIC_URL}${props.route}`}
    activeClassName={styles.activeLink}
    exact
  >
    {props.text}
  </NavLink>
);

/**
 * Navbar component
 */
const Navigation = (): JSX.Element => {
  return (
    <nav className={styles.mainNav}>
      {/* Main links */}
      <ul>
        <li>
          <Link route="/" text="Farm" />
        </li>
        <li>
          <Link route="/projects" text="Projects" />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
