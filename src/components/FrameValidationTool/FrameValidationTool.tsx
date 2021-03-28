import React, { useState, useEffect } from 'react';

import { Project, getProjectFromName, projectNameToUpperCase } from 'global.d';

import styles from "./FrameValidationTool.module.scss";

// Drop down components
import DropDownContainer from "./DropDownContainer/DropDownContainer";


interface Props {
  projectName: string;
}

const FrameValidationTool: React.FC<Props> = (props) => {
  const [project, setProject] = useState<Project | undefined>(undefined);

  const baseAPIUrl: string = process.env.REACT_APP_API_URL + '/validation/validated-progression/' + props.projectName;

  // Update state when switching between project routes
  useEffect(() => {
    const upperCaseName: string = projectNameToUpperCase(props.projectName);
    setProject(getProjectFromName(upperCaseName));
  }, [props.projectName]);


  return (
    <div className={styles.container}>
      <h2>Validation tool : </h2>
      <DropDownContainer baseAPIUrl={baseAPIUrl} />
    </div>
  );
}

export default FrameValidationTool;
