import React, { useState, useEffect } from 'react';

import { Project, getProjectFromName, projectNameToUpperCase } from 'global.d';

import DropDownContainer from "./DropDownContainer/DropDownContainer";

import styles from "./FrameValidationTool.module.scss";


interface ValidationToolProps {
  projectName: string;
}


/**
 * Root component of the frame validation tool
 */
const FrameValidationTool: React.FC<ValidationToolProps> = (props) => {
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
