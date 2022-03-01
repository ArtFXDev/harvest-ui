import { useFetchData } from "hooks/fetch";
import React, { useContext } from "react";
import { Job } from "types/tractor";

export interface JobsContext {
  jobs?: { [jid: string]: Job };
}

export const JobsQueryContext = React.createContext<JobsContext>(
  {} as JobsContext
);

interface ProvideBladeProps {
  children: JSX.Element;
}

/**
 * The ProvideAction provides the current action context and handle action updates
 */
export const ProvideBladesQuery = ({
  children,
}: ProvideBladeProps): JSX.Element => {
  const data = useFetchData("info/jobs", { interval: 10000 });
  let jobsDict: { [jid: string]: Job } | undefined = undefined;

  if (data) {
    jobsDict = {};
    for (const job of data.rows) {
      jobsDict[job.jid] = job;
    }
  }

  return (
    <JobsQueryContext.Provider
      value={{
        jobs: jobsDict,
      }}
    >
      {children}
    </JobsQueryContext.Provider>
  );
};

export const useJobsQuery = (): JobsContext => useContext(JobsQueryContext);
