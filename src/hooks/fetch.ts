import { useEffect, useState } from "react";
import { GetRoute, GetRoutes } from "types/api";
import { apiGet } from "utils/api";

interface FetchConfig {
  /** Interval in ms to refetch data */
  interval?: number;
}

/**
 * Custom React hook to fetch data from the Harvest API
 */
export function useFetchData(route: GetRoute, config: FetchConfig = {}) {
  type Data = GetRoutes[typeof route];
  const [data, setData] = useState<Data>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGet<Data>(route);
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
  }, [config.interval, route]);

  return data;
}
