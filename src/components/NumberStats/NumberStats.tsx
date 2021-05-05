import React, { useEffect, useState } from "react";
import TrackVisibility from 'react-on-screen';
import FadeIn from 'react-fade-in';
import AnimatedNumber from "animated-number-react";

import styles from "./NumberStats.module.scss";

interface CounterProps {
  route: string;
  dataTransform?: Function;
  label: string;
  color: string;
  refresh?: boolean;
}

const Counter: React.FC<CounterProps> = (props) => {
  const [value, setValue] = useState<number>();

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/stats/${props.route}`);
    const json = await response.json();

    setValue(props.dataTransform ? props.dataTransform(json) : json.value);
  }

  useEffect(() => {
    if (props.refresh) {
      const interval = setInterval(async () => {
        if (document.visibilityState === "visible") {
          fetchData();
        }
      }, 10000);

      fetchData();

      return () => clearInterval(interval);
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className={styles.counterContainer}>

      {value ?
        <AnimatedNumber value={value} delay={0.4} className={styles.counter} formatValue={(value: any) => value.toFixed(0)} />
        : <div className={styles.counter}>...</div>
      }

      <p style={{ color: props.color }} className={styles.label}>{props.label}</p>

    </div>
  );
};

const NumberStats: React.FC = () => {
  return (
    <TrackVisibility offset={-100} partialVisibility once>
      {({ isVisible }) => (
        isVisible ? (
          <FadeIn transitionDuration={1700} visible={isVisible}>

            <Counter
              route="blades-status"
              dataTransform={(json: any) => json.find((e: any) => e.name === "Busy").value}
              label="active tasks"
              color="#e8423b"
              refresh
            />

          </FadeIn>
        ) : <div>...</div>
      )}
    </TrackVisibility>
  );
};

export default NumberStats;
