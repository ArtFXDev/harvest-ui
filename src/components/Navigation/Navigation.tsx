import React from "react";
import { NavLink } from "react-router-dom";

import { PROJECTS } from "global.d";

import ProjectUtils from "utils/project-utils";

import styles from "./Navigation.module.scss";

const Link: React.FC<{ route: string; text: string }> = (props) => (
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
const Navigation: React.FC = () => {
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

      {/* List of projects */}
      <ul className={styles.projectsList}>
        {PROJECTS.map((project, index) => (
          <li key={`project-${index}`}>
            <NavLink
              to={`${
                process.env.PUBLIC_URL
              }/project/${ProjectUtils.projectNameToLowerHyphen(project.name)}`}
              activeClassName={styles.activeLink}
              style={{
                color: `${PROJECTS[index].color}`,
              }}
            >
              {ProjectUtils.projectNameToReadable(project.name)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
