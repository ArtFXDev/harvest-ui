import React from "react";
import { match } from "react-router";

// Components
import ProjectProgressChart from "components/charts/ProjectProgressChart/ProjectProgressChart";
import FrameValidationTool from "components/FrameValidationTool/FrameValidationTool";

export interface ProjectRouteParams {
  projectName: string;
}

interface ProjectPageProps {
  match: match<ProjectRouteParams>;
}

const ProjectPage: React.FC<ProjectPageProps> = (props) => (
  <>
    <ProjectProgressChart projectName={props.match.params.projectName} />
    <hr />

    {/* <p>The validation tool is under maintenance, please retry later...</p> */}
    <FrameValidationTool projectName={props.match.params.projectName} />
  </>
);

export default ProjectPage;
