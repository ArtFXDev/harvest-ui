import React, { ReactElement, ReactNode } from "react";
import FadeIn from "react-fade-in";
import TrackVisibility from "react-on-screen";
import { ResponsiveContainer } from "recharts";

import styles from "./ChartContainer.module.scss";

interface ChartContainerProps {
  title: string;
  titleParenthesis?: string;

  children: ReactNode;

  color?: string;
  backgroundColor?: string;
  gradient?: Array<string>;

  right?: JSX.Element;
  responsive?: boolean;

  isVisible?: boolean;

  height?: number;
}

const Chart = (props: ChartContainerProps): JSX.Element => {
  // Expand style properties
  const style: {
    color?: string;
    backgroundColor?: string;
    background?: string;
  } = {
    ...(props.color && { color: props.color }),
    ...(props.backgroundColor && { backgroundColor: props.backgroundColor }),
  };

  // Add linear gradient
  if (props.gradient) {
    style.background = `linear-gradient(to left, ${props.gradient.join(",")})`;
  }

  return (
    <div className={styles.container}>
      {/* Chart header */}
      <div className={styles.infos}>
        {/* Title */}
        <div className={styles.containerLeft}>
          <h2
            style={style}
            className={`${styles.projectTitle} ${
              props.backgroundColor || props.gradient ? styles.shadow : ""
            }`}
          >
            {props.title}
            {props.titleParenthesis && (
              <span className={styles.small}>({props.titleParenthesis})</span>
            )}
          </h2>
        </div>

        {/* Right section of the header */}
        {props.right && (
          <div className={styles.containerRight}>{props.right}</div>
        )}
      </div>

      {/* Display children charts */}
      {props.children && (
        <div
          className={styles.chartContainer}
          style={{ ...(props.height && { height: props.height }) }}
        >
          {!props.responsive ? (
            <ResponsiveContainer width="100%" height="100%">
              {props.children as ReactElement}
            </ResponsiveContainer>
          ) : (
            <>{props.children}</>
          )}
        </div>
      )}
    </div>
  );
};

const ChartContainer = (props: ChartContainerProps): JSX.Element => {
  return (
    <TrackVisibility offset={-300} partialVisibility once>
      {({ isVisible }) =>
        isVisible ? (
          <FadeIn transitionDuration={1700} visible={isVisible}>
            <Chart {...props} isVisible={isVisible} />
          </FadeIn>
        ) : (
          <div
            className={styles.chartContainer}
            style={{ ...(props.height && { height: props.height }) }}
          />
        )
      }
    </TrackVisibility>
  );
};

export default ChartContainer;
