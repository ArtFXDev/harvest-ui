import ProjectsFrameRatioBarChart from "components/charts/ProjectsFrameRatioBarChart/ProjectsFrameRatioBarChart";
import ProjectsHistoryChart from "components/charts/ProjectsHistoryChart/ProjectsHistoryChart";
import ProjectsProgressChart from "components/charts/ProjectsProgressChart/ProjectsProgressChart";

const ProjectsPage = (): JSX.Element => (
  <>
    <ProjectsProgressChart />
    <hr />
    <ProjectsFrameRatioBarChart />
    <hr />
    <ProjectsHistoryChart />
  </>
);

export default ProjectsPage;
