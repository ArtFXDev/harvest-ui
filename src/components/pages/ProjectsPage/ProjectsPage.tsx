import React from 'react';

// Components
// import ComputeTimeBarChart from 'components/charts/ComputeTimeBarChart/ComputeTimeBarChart';
import ProjectsProgressChart from 'components/charts/ProjectsProgressChart/ProjectsProgressChart';
import ProjectsHistoryChart from 'components/charts/ProjectsHistoryChart/ProjectsHistoryChart';
import ProjectsFrameRatioBarChart from 'components/charts/ProjectsFrameRatioBarChart/ProjectsFrameRatioBarChart';

const ProjectsPage: React.FC = () => (
  <>
    <ProjectsProgressChart />
    <hr />
    <ProjectsFrameRatioBarChart />
    <hr />
    <ProjectsHistoryChart />
  </>
);

export default ProjectsPage;
