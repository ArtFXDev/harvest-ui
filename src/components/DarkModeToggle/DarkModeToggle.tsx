import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";

import styles from "./DarkModeToggle.module.scss";


const DarkModeToggle: React.FC = () => {
  // Get user system dark mode
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)"
    },
    undefined,
    prefersDark => {
      setIsDark(prefersDark);
    }
  );

  // Set the dark mode to be the user defined theme
  const [isDark, setIsDark] = useState<boolean>(systemPrefersDark);

  // When toggled, add "dark" class to <html> tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark]);

  return (
    <div>
      <input
        type="checkbox"
        id="switch"
        checked={isDark}
        className={styles.checkbox}
        onChange={_ => setIsDark(!isDark)} />

      <label htmlFor="switch" className={styles.toggle}>
        <div className={styles.emojisContainer}>
          <span className={styles.night}>🌛</span>
          <span className={styles.day}>🌞</span>
        </div>
      </label>
    </div>
  );
};

export default DarkModeToggle;
