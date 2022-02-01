import ProjectsFrameRatioBarChart from "components/charts/ProjectsFrameRatioBarChart/ProjectsFrameRatioBarChart";
import ProjectsHistoryChart from "components/charts/ProjectsHistoryChart/ProjectsHistoryChart";
// Components
import ProjectsProgressChart from "components/charts/ProjectsProgressChart/ProjectsProgressChart";
import React from "react";

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
