import React, {ReactNode} from 'react';

import styles from './ChartContainer.module.scss';

interface Props {
  title: string;
  children: ReactNode;
  color?: string;
  backgroundColor?: string;
  right?: any;
}

const ChartContainer: React.FC<Props> = (props: Props) => {
  const style: { color?: string, backgroundColor?: string } = {
    ...props.color && {color: props.color},
    ...props.backgroundColor && {backgroundColor: props.backgroundColor}
  };

  return (
    <div>
      {/* Chart header */}
      <div className={styles.infos}>
        <div className={styles.containerLeft}>
          <h2 style={style}
              className={styles.projectTitle}>
            {props.title}
          </h2>
        </div>

        {props.right &&
          <div className={styles.containerRight}>
            {props.right}
          </div>
        }
      </div>

      {props.children}
    </div>
  );
};

export default ChartContainer;
