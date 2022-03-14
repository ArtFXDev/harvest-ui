import OwnerFrequencyPieChart from "./OwnerFrequencyBarChart";
import ProjectFrequencyBarChart from "./ProjectFrequencyBarChart";
import TaskStatusPerProject from "./TaskStatusPerProject";

const JobsPage = (): JSX.Element => (
  <>
    <TaskStatusPerProject />
    <hr />
    <OwnerFrequencyPieChart />
    <hr />
    <ProjectFrequencyBarChart />
  </>
);

export default JobsPage;
