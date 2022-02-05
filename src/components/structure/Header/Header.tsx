import artfxLogo from "assets/images/artfx_black_logo.png";
import Navigation from "components/structure/Navigation/Navigation";

import styles from "./Header.module.scss";

const Header = (): JSX.Element => (
  <header className={styles.header}>
    <h1>Harvest {Math.random() > 0.5 ? "👨‍🌾" : "👩‍🌾"}🌾</h1>
    <img src={artfxLogo} alt="ArtFX Logo" className={styles.artfxLogo} />
    <Navigation />
  </header>
);

export default Header;
