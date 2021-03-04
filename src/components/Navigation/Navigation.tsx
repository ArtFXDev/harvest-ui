import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from "./Navigation.module.scss";


const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={`${process.env.PUBLIC_URL}/`} exact activeClassName={styles.activeLink}>Home</NavLink>
        </li>
        <li>
          <NavLink to={`${process.env.PUBLIC_URL}/projects`} exact activeClassName={styles.activeLink}>Projects</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
