import React from 'react';
import { NavLink } from 'react-router-dom';

import { PROJECTS } from 'global.d';

import ProjectUtils from 'utils/project-utils';

import styles from './Navigation.module.scss';

/**
 * Navbar component
 */
const Navigation: React.FC = () => {
  return (
    <nav className={styles.mainNav}>
      <ul>
        <li>
          <NavLink to={`${process.env.PUBLIC_URL}/`} exact activeClassName={styles.activeLink}>Farm</NavLink>
        </li>
        <li>
          <NavLink to={`${process.env.PUBLIC_URL}/projects`} exact activeClassName={styles.activeLink}>Projects</NavLink>
        </li>
      </ul>

      <ul className={styles.projectsList}>
        {
          PROJECTS.map((project, index) => {
            return (<li key={`project-${index}`}>
              <NavLink
                to={`${process.env.PUBLIC_URL}/project/${ProjectUtils.projectNameToLowerHyphen(project.name)}`}
                activeClassName={styles.activeLink}
                style={{
                  color: `${PROJECTS[index].color}`
                }}
              >
                {ProjectUtils.projectNameToReadable(project.name)}
              </NavLink>
            </li>);
          })
        }
      </ul>
    </nav>
  );
}

export default Navigation;
