import React, { ReactElement, ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';

import styles from './ChartContainer.module.scss';

interface Props {
  title: string;
  children: ReactNode;
  color?: string;
  backgroundColor?: string;
  right?: any;
  responsive?: boolean;
}

const ChartContainer: React.FC<Props> = (props: Props) => {
  const style: { color?: string, backgroundColor?: string } = {
    ...props.color && { color: props.color },
    ...props.backgroundColor && { backgroundColor: props.backgroundColor }
  };

  return (
    <div className={styles.container}>
      {/* Chart header */}
      <div className={styles.infos}>
        <div className={styles.containerLeft}>
          <h2 style={style}
            className={`${styles.projectTitle} ${props.backgroundColor ? styles.shadow : ''}`}>
            {`${props.title}`}
          </h2>
        </div>

        {props.right &&
          <div className={styles.containerRight}>
            {props.right}
          </div>
        }
      </div>

      {/* Display children chart */}
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
};

export default ChartContainer;
