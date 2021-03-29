import React from 'react';

// Components
import ComputeTimeBarChart from 'components/charts/ComputeTimeBarChart/ComputeTimeBarChart';
import ProjectsProgressChart from 'components/charts/ProjectsProgressChart/ProjectsProgressChart';

const ProjectsPage: React.FC = () => (
  <>
    <ProjectsProgressChart />
    <hr />
    <ComputeTimeBarChart />
  </>
);

export default ProjectsPage;
