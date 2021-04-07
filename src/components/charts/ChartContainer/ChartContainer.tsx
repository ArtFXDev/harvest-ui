import React, { ReactElement, ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';
import TrackVisibility from 'react-on-screen';
import FadeIn from 'react-fade-in';

import styles from './ChartContainer.module.scss';

interface Props {
  title: string;
  children: ReactNode;

  color?: string;
  backgroundColor?: string;
  gradient?: Array<string>;

  right?: any;
  responsive?: boolean;

  isVisible?: boolean;
}


const Chart: React.FC<Props> = (props: Props) => {
  // Expand style properties
  const style: { color?: string, backgroundColor?: string, background?: string } = {
    ...props.color && { color: props.color },
    ...props.backgroundColor && { backgroundColor: props.backgroundColor }
  };

  // Add linear gradient
  if (props.gradient) {
    style.background = `linear-gradient(to left, ${props.gradient.join(',')})`;
  }

  return (
    <div className={styles.container}>

      {/* Chart header */}
      <div className={styles.infos}>

        {/* Title */}
        <div className={styles.containerLeft}>
          <h2 style={style}
            className={`${styles.projectTitle} ${(props.backgroundColor || props.gradient) ? styles.shadow : ''}`}>
            {`${props.title}`}
          </h2>
        </div>

        {/* Right section of the header */}
        {props.right &&
          <div className={styles.containerRight}>
            {props.right}
          </div>
        }

      </div>

      {/* Display children charts */}
      {props.children &&
        <div className={styles.chartContainer} >
          {!props.responsive ? (
            <ResponsiveContainer width="100%" height="100%">
              {props.children as ReactElement<any>}
            </ResponsiveContainer>
          ) : (
            <>
              {props.children}
            </>
          )}
        </div>
      }

    </div>
  );
}

const ChartContainer: React.FC<Props> = (props: Props) => {
  return (
    <TrackVisibility partialVisibility once>
      {({ isVisible }) => {
        return (
          <FadeIn transitionDuration={1500} visible={isVisible}>
            <Chart {...props} isVisible={isVisible} />
          </FadeIn>
        )
      }}
    </TrackVisibility>
  );
};

export default ChartContainer;
