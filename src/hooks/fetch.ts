import { useEffect, useState } from "react";
import { GetParams, GetResponse, GetRoutes } from "types/api";
import { apiGet } from "utils/api";
import { singleDepthEqual } from "utils/diff";

import { usePrevious } from "./utils";

export interface FetchConfig {
  /** Interval in ms to refetch data */
  interval?: number;
}

/**
 * Custom React hook to fetch data from the Harvest API
 */
export function useFetchData<R extends keyof GetRoutes>(
  route: R,
  config: FetchConfig = {},
  params: Partial<GetParams<R>> = {}
) {
  const previousParams = usePrevious(params);
  const [data, setData] = useState<GetResponse<R>>();

  useEffect(() => {
    // Make sure previous params are not equal
    // It was creating an infinite loop since comparing an object was triggering useEffect every time
    // See: https://stackoverflow.com/questions/54095994/react-useeffect-comparing-objects
    if (previousParams && singleDepthEqual(params, previousParams)) return;

    const fetchData = async () => {
      const result = await apiGet<R>(route, params);
      setData(result);
    };

    // Only fetch data when the window is visible
    const fetchIfVisible = () => {
      if (document.visibilityState === "visible") {
        fetchData();
      }
    };

    let interval: NodeJS.Timeout | undefined = undefined;

    if (config.interval) {
      interval = setInterval(fetchIfVisible, config.interval);
    }

    fetchData();

    // Clear the interval on unmount
    if (interval) {
      return () => clearInterval(interval as NodeJS.Timeout);
    }
  }, [config.interval, params, previousParams, route]);

  return data;
}
