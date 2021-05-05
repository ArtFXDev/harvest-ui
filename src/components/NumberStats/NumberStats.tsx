import React, { useEffect, useState } from "react";
import TrackVisibility from 'react-on-screen';
import FadeIn from 'react-fade-in';
import AnimatedNumber from "animated-number-react";

import DateUtils from 'utils/date-utils';

import styles from "./NumberStats.module.scss";

interface CounterProps {
  route: string;
  routeParams?: Array<{ key: string, value: string | number }>;
  dataTransform?: Function;
  label: string;
  color: string;
  refresh?: boolean;
  refreshTime?: number;
  info?: string;
}

const Counter: React.FC<CounterProps> = (props) => {
  const [value, setValue] = useState<number>();

  const fetchData = async () => {
    let route = `${process.env.REACT_APP_API_URL}/stats/${props.route}`;

    // Add route params
    if (props.routeParams) {
      const params = props.routeParams.map(param => `${param.key}=${param.value}`).join('&');
      route = `${route}?${params}`;
    }

    const response = await fetch(route);
    const json = await response.json();

    setValue(props.dataTransform ? props.dataTransform(json) : json.value);
  }

  // Fetch data and refresh
  useEffect(() => {
    if (props.refresh) {
      const interval = setInterval(async () => {
        if (document.visibilityState === "visible") {
          fetchData();
        }
      }, props.refreshTime ? (props.refreshTime * 1000) : 10000);

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

      {props.info && <p className={styles.info}>({props.info})</p>}

    </div>
  );
};


const NumberStats: React.FC = () => {
  const now = new Date();
  const yesterday = new Date(now.getTime());
  yesterday.setDate(now.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

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

            <div className={styles.time}>
              <Counter
                route="total-computetime"
                routeParams={[{ key: "start", value: yesterday.getTime() }, { key: "end", value: yesterday.getTime() }]}
                dataTransform={(json: any) => json.find((e: any) => e.project === "TOTAL").hours}
                label="hours"
                color="#009bd9"
              />

              <Counter
                route="total-computetime"
                routeParams={[{ key: "start", value: yesterday.getTime() }, { key: "end", value: yesterday.getTime() }]}
                dataTransform={(json: any) => json.find((e: any) => e.project === "TOTAL").minutes}
                label={"minutes of render time since 24h"}
                info={`${yesterday.getDate()} ${DateUtils.getMonthName(yesterday)} 00h00 - ${now.getDate()} ${DateUtils.getMonthName(now)} 00h00`}
                color="#009bd9"
              />
            </div>

          </FadeIn>
        ) : <div>...</div>
      )}
    </TrackVisibility>
  );
};

export default NumberStats;
