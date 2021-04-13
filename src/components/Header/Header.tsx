import React from 'react';

import Navigation from 'components/Navigation/Navigation';
import DarkModeToggle from 'components/DarkModeToggle/DarkModeToggle';

import artfxLogo from 'assets/images/ArtFx---Logo-generique-noir.png';

import styles from './Header.module.scss';

const Header: React.FC = () => (
  <header className={styles.header}>
    <h1>Harvest 👨‍🌾🌾</h1>
    <img src={artfxLogo} alt="ArtFX Logo" className={styles.artfxLogo} />
    <Navigation />
    <DarkModeToggle />
  </header>
);

export default Header;
