import React from 'react';
import { NavLink } from 'react-router-dom';

import { PROJECTS } from '../../global.d';

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
            const lowerNameHyphen: string = project.name.toLowerCase().replaceAll('_', '-');
            return (<li key={`project-${index}`}>
              <NavLink
                to={`${process.env.PUBLIC_URL}/project/${lowerNameHyphen}`}
                activeClassName={styles.activeLink}
                style={{
                  color: `${PROJECTS[index].color}`
                }}
              >
                {project.name.split('_').map(e => e[0] + e.slice(1).toLowerCase()).join(' ')}
              </NavLink>
            </li>);
          })
        }
      </ul>
    </nav>
  );
}

export default Navigation;
