import OwnerFrequencyPieChart from "./OwnerFrequencyBarChart";
import ProjectFrequencyBarChart from "./ProjectFrequencyBarChart";

const JobsPage = (): JSX.Element => (
  <>
    <OwnerFrequencyPieChart />
    <hr />
    <ProjectFrequencyBarChart />
  </>
);

export default JobsPage;
