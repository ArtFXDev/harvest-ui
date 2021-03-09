import React, { useState, useEffect } from 'react';
import { match } from 'react-router';

import { Project, getProjectFromName, projectNameToUpperCase, projectNameToReadable } from '../../global.d';

import styles from "./FrameValidationTool.module.scss";

// Drop down components
import DropDownContainer from "./DropDownContainer/DropDownContainer";
import DropDownItem from "./DropDownItem/DropDownItem";

interface RouteParams {
  projectName: string;
}

interface Props {
  match?: match<RouteParams>;
}

interface Sequence {
  index: number;
  total: number;
  valid: number;
}

const FrameValidationTool: React.FC<Props> = (props) => {
  const [project, setProject] = useState<Project | undefined>(undefined);

  const [sequences, setSequences] = useState<Array<Sequence>>([]);

  const apiUrl = process.env.REACT_APP_API_URL + '/validation/validated-progression/' + props.match!.params.projectName;

  const fetchSequences = async () => {
    await fetch(apiUrl).then((response) => {
      return response.json();
    }).then((json) => setSequences(json))
      .catch((error) => console.log(error));
  }

  // Update state when switching between project routes
  useEffect(() => {
    const upperCaseName: string = projectNameToUpperCase(props.match!.params.projectName);
    setProject(getProjectFromName(upperCaseName));

    // Fetch sequences based on the project
    fetchSequences();
  }, [props.match!.params.projectName]);


  return (
    <div className={styles.container}>
      {project &&
        <h2 style={{ backgroundColor: project?.color }}
          className={styles.projectTitle}>
          {projectNameToReadable(project?.name)}
        </h2>
      }

      <DropDownContainer>
        {sequences &&
          sequences.map((s: Sequence) => {
            return <DropDownItem key={"sq-" + s.index} depth={0} baseUrl={apiUrl} index={s.index} valid={s.valid === s.total} isModified={false} />
          })
        }
      </DropDownContainer>
    </div>
  );
}

export default FrameValidationTool;
