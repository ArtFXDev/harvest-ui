// Components
import ProjectProgressChart from "components/charts/ProjectProgressChart/ProjectProgressChart";
import { match } from "react-router";

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
