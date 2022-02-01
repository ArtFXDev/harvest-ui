import React from "react";

import Navigation from "components/structure/Navigation/Navigation";

import artfxLogo from "assets/images/ArtFx---Logo-generique-noir.png";

import styles from "./Header.module.scss";

const Header: React.FC = () => (
  <header className={styles.header}>
    <h1>Harvest 👨‍🌾🌾</h1>
    <img src={artfxLogo} alt="ArtFX Logo" className={styles.artfxLogo} />
    <Navigation />
  </header>
);

export default Header;
