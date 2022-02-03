import AnimatedNumber from "animated-number-react";
import { FetchConfig, useFetchData } from "hooks/fetch";
import React from "react";
import FadeIn from "react-fade-in";
import TrackVisibility from "react-on-screen";
import { GetParams, GetResponse, GetRoute } from "types/api";
import { sum } from "utils/array";
import { COLORS } from "utils/colors";
import * as DateUtils from "utils/date";

import styles from "./NumberStats.module.scss";

interface CounterProps<R extends GetRoute> {
  /** The API route to fetch data from */
  route: R;

  /** Optional route params */
  routeParams?: Partial<GetParams<R>>;

  fetchConfig?: FetchConfig;

  /** Function to transform the incoming data into a single value */
  dataTransform: (data: GetResponse<R>) => number;

  /** Label to be displayed */
  label: string;

  /** Color of the text */
  color: string;

  /** Info text to display */
  info?: string;

  /**  */
  fontSize?: number;
}

const Counter = <R extends GetRoute>(props: CounterProps<R>): JSX.Element => {
  const data = useFetchData(props.route, props.fetchConfig, props.routeParams);

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
  const yesterday = DateUtils.yesterday();

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
                  color={COLORS.red}
                  dataTransform={(data) => data.busy}
                  fetchConfig={{ interval: 10000 }}
                />

                <Counter
                  route="current/blade-usage"
                  label="computers"
                  color={COLORS.purple}
                  dataTransform={(usage) => sum(Object.values(usage))}
                />

                <Counter
                  route="info/projects"
                  dataTransform={(projects) => projects.length}
                  label="projects"
                  color={COLORS.green}
                />
              </div>

              <div className={styles.time}>
                <Counter
                  route="info/compute-time"
                  label="hours"
                  color={COLORS.blue}
                  dataTransform={(response) => response.hours}
                  routeParams={{
                    start: yesterday.getTime(),
                    end: now.getTime(),
                  }}
                />

                <Counter
                  route="info/compute-time"
                  color={COLORS.blue}
                  fontSize={35}
                  routeParams={{
                    start: yesterday.getTime(),
                    end: now.getTime(),
                  }}
                  dataTransform={(response) => response.minutes}
                  label={"minutes of render time in the last 24h"}
                  info={`${yesterday.getDate()} ${DateUtils.getMonthName(
                    yesterday
                  )} 00h00 - ${now.getDate()} ${DateUtils.getMonthName(
                    now
                  )} 00h00`}
                />
              </div>
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
