import { useEffect, useState } from "react";
import { apiGet } from "utils/api";

interface FetchConfig {
  interval?: number;
}

export function useFetchData<T>(route: string, config: FetchConfig = {}) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const fetchData = async () => {
      let result = await apiGet<T>(route);
      setData(result);
    };

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

    if (interval) {
      return () => clearInterval();
    }
  }, [config.interval, route]);

  return data;
}
