import React from 'react';
import { match } from 'react-router';

// Components
import ProjectProgressChart from 'components/charts/ProjectProgressChart/ProjectProgressChart';
import FrameValidationTool from 'components/FrameValidationTool/FrameValidationTool';

export interface ProjectRouteParams {
  projectName: string;
}

interface Props {
  match: match<ProjectRouteParams>;
}

const ProjectPage: React.FC<Props> = (props) => (
  <>
    <ProjectProgressChart projectName={props.match.params.projectName} />
    <hr />
    <FrameValidationTool projectName={props.match.params.projectName} />
  </>
);

export default ProjectPage;
