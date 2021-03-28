import React from 'react';

// Components
import ComputeTimeBarChart from 'components/charts/ComputeTimeBarChart/ComputeTimeBarChart';
import ProgressFramesChart from 'components/charts/ProgressFramesChart/ProgressFramesChart';

const ProjectsPage: React.FC = () => (
  <>
    <ProgressFramesChart />
    <hr />
    <ComputeTimeBarChart />
  </>
);

export default ProjectsPage;
