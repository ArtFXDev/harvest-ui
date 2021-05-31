import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState<Array<any> | undefined>([]);

  const fetchData = async () => {
    fetch(process.env.REACT_APP_API_URL + "/infos/finished-projects")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        setData(undefined);
      });
  };

  // Fetch data at component mount
  useEffect(() => {
    fetchData();
  }, []);

  const getCrown = (projectName: string) => {
    if (!data) return;
    const foundIndex = data.findIndex((p: any) => p.name === projectName);
    const scale = 1 + (foundIndex / data.length) * 0.5;

    if (foundIndex >= 0 && data[foundIndex].progression === 1) {
      return <span className={styles.crown} style={{ fontSize: `${scale}em` }}>👑</span>
    }
  }

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
              to={`${process.env.PUBLIC_URL
                }/project/${ProjectUtils.projectNameToLowerHyphen(project.name)}`}
              activeClassName={styles.activeLink}
              style={{
                color: `${PROJECTS[index].color}`,
              }}
            >
              {ProjectUtils.projectNameToReadable(project.name)}
            </NavLink>

            {/* Display crown */}
            {data && getCrown(project.name)}
          </li>
        ))}

      </ul>
    </nav>
  );
};

export default Navigation;
