import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";

import styles from "./DarkModeToggle.module.scss";


/**
 * Dark mode toggle button
 * Saves theme preference to local storage
 */
const DarkModeToggle: React.FC = () => {
  // Get user system dark mode
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)"
    },
    undefined
  ) ? "dark" : "light";

  /**
   * If already saved theme on local storage use it otherwise use the system preference
   */
  const getInitialDark = (): string => {
    const currentTheme: (string | null) = localStorage.getItem("theme");

    if (!currentTheme) {
      localStorage.setItem("theme", systemPrefersDark);
      console.log("set it to system preference: " + systemPrefersDark);
    }

    return localStorage.getItem("theme")!;
  }

  // Set the dark mode to be the user defined theme
  const [theme, setTheme] = useState<string>(getInitialDark());

  // When toggled, add "dark" class to <html> tag
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div>
      <input
        type="checkbox"
        id="switch"
        checked={theme === "dark"}
        className={styles.checkbox}
        onChange={_ => setTheme(theme === "dark" ? "light" : "dark")} />

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
