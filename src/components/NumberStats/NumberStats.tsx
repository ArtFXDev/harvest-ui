import React, { useEffect, useState } from "react";
import TrackVisibility from "react-on-screen";
import FadeIn from "react-fade-in";
import AnimatedNumber from "animated-number-react";

import DateUtils from "utils/date-utils";

import styles from "./NumberStats.module.scss";
import { apiURL } from "utils/api";

interface CounterProps {
  route: string;
  routeParams?: Array<{ key: string; value: string | number }>;
  dataTransform?: Function;
  label: string;
  color: string;
  refresh?: boolean;
  refreshTime?: number;
  info?: string;
  fontSize?: string;
}

const Counter: React.FC<CounterProps> = (props) => {
  const [value, setValue] = useState<number>();

  // const data =

  // // Fetch data and refresh
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let route = apiURL(props.route);

  //     // Add route params
  //     if (props.routeParams) {
  //       const params = props.routeParams
  //         .map((param) => `${param.key}=${param.value}`)
  //         .join("&");
  //       route = `${route}?${params}`;
  //     }

  //     const response = await fetch(route);
  //     const json = await response.json();
  //     console.log(json);

  //     setValue(props.dataTransform ? props.dataTransform(json) : json.value);
  //   };

  //   if (props.refresh) {
  //     const interval = setInterval(
  //       async () => {
  //         if (document.visibilityState === "visible") {
  //           fetchData();
  //         }
  //       },
  //       props.refreshTime ? props.refreshTime * 1000 : 10000
  //     );

  //     fetchData();

  //     return () => clearInterval(interval);
  //   } else {
  //     fetchData();
  //   }
  // }, [props]);

  return (
    <div className={styles.counterContainer}>
      {value ? (
        <div style={{ fontSize: props.fontSize || 40 }}>
          <AnimatedNumber
            value={value}
            delay={200}
            className={styles.counter}
            formatValue={(value: number) => value.toFixed(0)}
          />
        </div>
      ) : (
        <div className={styles.counter}>...</div>
      )}

      <p style={{ color: props.color }} className={styles.label}>
        {props.label}
      </p>

      {props.info && <p className={styles.info}>({props.info})</p>}
    </div>
  );
};

const NumberStats = (): JSX.Element => {
  const now = new Date();
  const yesterday = new Date(now.getTime());
  yesterday.setDate(now.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  return (
    <TrackVisibility offset={-100} partialVisibility once>
      {({ isVisible }) =>
        isVisible ? (
          <FadeIn transitionDuration={1700} visible={isVisible}>
            <div className={styles.inlineStats}>
              <div className={styles.inline}>
                <Counter
                  route="stats/blade-status"
                  dataTransform={(statuses: any) => statuses.busy}
                  label="active tasks"
                  color="#e8423b"
                  refresh
                />

                {/* <Counter
                  route="stats/blade-status"
                  dataTransform={(json: any) =>
                    json
                      .map((e: any) => e.value)
                      .reduce((a: number, b: number) => a + b, 0)
                  }
                  label="computers"
                  color="#b0358b"
                />

                <Counter
                  route="infos/projects"
                  dataTransform={(json: any) => json.length}
                  label="projects"
                  color="rgb(21, 175, 151)"
                /> */}
              </div>

              {/* <div className={styles.time}>
                <Counter
                  route="stats/total-computetime"
                  routeParams={[
                    { key: "start", value: yesterday.getTime() },
                    { key: "end", value: yesterday.getTime() },
                  ]}
                  dataTransform={(json: any) =>
                    json.find((e: any) => e.project === "TOTAL").hours
                  }
                  label="hours"
                  color="#009bd9"
                />

                <Counter
                  route="stats/total-computetime"
                  routeParams={[
                    { key: "start", value: yesterday.getTime() },
                    { key: "end", value: yesterday.getTime() },
                  ]}
                  dataTransform={(json: any) =>
                    json.find((e: any) => e.project === "TOTAL").minutes
                  }
                  label={"minutes of render time in the last 24h"}
                  info={`${yesterday.getDate()} ${DateUtils.getMonthName(
                    yesterday
                  )} 00h00 - ${now.getDate()} ${DateUtils.getMonthName(
                    now
                  )} 00h00`}
                  color="#009bd9"
                  fontSize="35px"
                />
              </div> */}
            </div>
          </FadeIn>
        ) : (
          <div>...</div>
        )
      }
    </TrackVisibility>
  );
};

export default NumberStats;
