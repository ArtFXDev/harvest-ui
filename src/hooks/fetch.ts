import { useEffect, useState } from "react";
import { GetParams, GetResponse, GetRoutes } from "types/api";
import { apiGet } from "utils/api";

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
  const [data, setData] = useState<GetResponse<R>>();

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.interval, route]);

  return data;
}