import AnimatedNumber from "animated-number-react";
import { useFetchData } from "hooks/fetch";
import React from "react";
import FadeIn from "react-fade-in";
import TrackVisibility from "react-on-screen";
import { GetRoute, GetRoutes } from "types/api";

import styles from "./NumberStats.module.scss";

interface CounterProps<R extends GetRoute> {
  /** The API route to fetch data from */
  route: R;
  routeParams?: Array<{ key: string; value: string | number }>;
  /** Function to transform the incoming data into a single value */
  dataTransform: (data: GetRoutes[R]) => number;

  /** Label to be displayed */
  label: string;
  /** Color of the text */
  color: string;

  /** Interval in ms to refetch data */
  refreshInterval?: number;
  refreshTime?: number;
  info?: string;
  fontSize?: string;
}

const Counter = <R extends GetRoute>(props: CounterProps<R>): JSX.Element => {
  const data = useFetchData(props.route, { interval: props.refreshInterval });

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
      {data ? (
        <div style={{ fontSize: props.fontSize || 40 }}>
          <AnimatedNumber
            value={props.dataTransform(data)}
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
                  route="current/blade-usage"
                  label="active tasks"
                  color="#e8423b"
                  dataTransform={(data) => data.busy}
                  refreshInterval={10000}
                />

                <Counter
                  route="current/blade-usage"
                  label="computers"
                  color="#b0358b"
                  dataTransform={(data) =>
                    Object.values(data).reduce(
                      (a: number, b: number) => a + b,
                      0
                    )
                  }
                />

                {/*<Counter
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
