import React from 'react';

import githubLogo from 'assets/images/github-logo.png';

import styles from './Footer.module.scss';


const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <hr />
    <p>{`© ${new Date().getFullYear()} ArtFX`}</p>
    <p>
      <a
        href="https://github.com/ArtFXDev/harvest-ui/issues"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.bugReport}>Report a bug
      </a>
    </p>

    <a href="https://github.com/ArtFXDev/harvest-ui" target="_blank" rel="noopener noreferrer">
      <img src={githubLogo} alt="GitHub" className={styles.githubLogo} title="source code" />
    </a>
  </footer>
);

export default Footer;
