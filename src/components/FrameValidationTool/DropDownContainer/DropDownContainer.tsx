import React, { useState, useEffect } from 'react';

import styles from "./DropDownContainer.module.scss";


const DropDownContainer: React.FC = (props) => {

  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}

export default DropDownContainer;
