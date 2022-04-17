import OwnerFrequencyPieChart from "./OwnerFrequencyBarChart";
import OwnerFrequencyHistoryLineChart from "./OwnerFrequencyHistoryLineChart";
import ProjectFrequencyBarChart from "./ProjectFrequencyBarChart";

const JobsPage = (): JSX.Element => (
  <>
    <OwnerFrequencyPieChart />
    <hr />
    <OwnerFrequencyHistoryLineChart />
    <hr />
    <ProjectFrequencyBarChart />
  </>
);

export default JobsPage;
