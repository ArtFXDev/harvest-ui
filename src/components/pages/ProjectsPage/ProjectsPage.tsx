import React from 'react';

// Components
import ComputeTimeBarChart from 'components/charts/ComputeTimeBarChart/ComputeTimeBarChart';
import ProjectsProgressChart from 'components/charts/ProjectsProgressChart/ProjectsProgressChart';
import ProjectsHistoryChart from 'components/charts/ProjectsHistoryChart/ProjectsHistoryChart';

const ProjectsPage: React.FC = () => (
  <>
    <ProjectsProgressChart />
    <hr />
    <ProjectsHistoryChart />
    <hr />
    <ComputeTimeBarChart />
  </>
);

export default ProjectsPage;
