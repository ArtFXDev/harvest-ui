import React, { useState, useEffect } from 'react';

import styles from "./DropDownContainer.module.scss";


const DropDownContainer: React.FC = (props) => {

  const onConfirm = () => {
  }

  return (
    <div className={styles.container}>
      {props.children}

      <div className={styles.buttonConfirm} onClick={onConfirm}>Confirm</div>
    </div>
  );
}

export default DropDownContainer;
