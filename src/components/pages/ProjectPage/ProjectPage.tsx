import React from "react";
import { match } from "react-router";

// Components
import ProjectProgressChart from "components/charts/ProjectProgressChart/ProjectProgressChart";

export interface ProjectRouteParams {
  projectName: string;
}

interface ProjectPageProps {
  match: match<ProjectRouteParams>;
}

const ProjectPage = (props: ProjectPageProps): JSX.Element => (
  <ProjectProgressChart projectName={props.match.params.projectName} />
);

export default ProjectPage;
