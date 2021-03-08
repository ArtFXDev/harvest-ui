import React from 'react';
import { NavLink } from 'react-router-dom';

import { PROJECTS, projectNameToLowerHyphen, projectNameToReadable } from '../../global.d';

import styles from "./Navigation.module.scss";


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
            const lowerNameHyphen: string = projectNameToLowerHyphen(project.name);

            return (<li key={`project-${index}`}>
              <NavLink
                to={`${process.env.PUBLIC_URL}/project/${lowerNameHyphen}`}
                activeClassName={styles.activeLink}
                style={{
                  color: `${PROJECTS[index].color}`
                }}
              >
                {projectNameToReadable(project.name)}
              </NavLink>
            </li>);
          })
        }
      </ul>
    </nav>
  );
}

export default Navigation;
