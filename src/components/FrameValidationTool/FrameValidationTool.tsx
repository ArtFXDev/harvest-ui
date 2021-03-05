import React, { useState } from 'react';
import { match } from 'react-router';

import { PROJECTS, Project, getProjectFromName, projectNameToUpperCase } from '../../global.d';

import styles from "./FrameValidationTool.module.scss";

interface RouteParams {
  projectName: string;
}

interface Props {
  match?: match<RouteParams>;
}

const FrameValidationTool: React.FC<Props> = ({ match }) => {
  const upperCaseName: string = projectNameToUpperCase(match!.params.projectName);
  const [project, setProject] = useState<Project>(getProjectFromName(upperCaseName));

  console.log(project);

  const style = {
    backgroundColor: project.color,
  }

  return (
    <div className={styles.container}>
      {match &&
        <h2 style={style} className={styles.projectTitle}>
          {match.params.projectName}
        </h2>
      }
      {/* <h1>Project {props.match.params.projectName} - Frame validation</h1> */}
    </div>
  );
}

export default FrameValidationTool;
