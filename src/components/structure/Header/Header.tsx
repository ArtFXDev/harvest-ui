import artfxLogo from "assets/images/ArtFx---Logo-generique-noir.png";
import Navigation from "components/structure/Navigation/Navigation";
import React from "react";

import styles from "./Header.module.scss";

const Header = (): JSX.Element => (
  <header className={styles.header}>
    <h1>Harvest 👨‍🌾🌾</h1>
    <img src={artfxLogo} alt="ArtFX Logo" className={styles.artfxLogo} />
    <Navigation />
  </header>
);

export default Header;
