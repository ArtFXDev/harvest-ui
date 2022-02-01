namespace DataUtils {
  /**
   * Normalize data to percentage relative to the sum of all the keys
   */
  export const normalizeDataToPercent = (
    data: Array<any>,
    keys: Array<string>
  ): Array<any> =>
    data.map((d: any) => {
      const total = keys
        .map((state) => d[state])
        .reduce((e, acc) => acc + e, 0);
      keys.forEach((state) => (d[state] = (d[state] / total) * 100));
      d.total = total;
      return d;
    });

  export const sortByKey = (data: [], key: string): [] =>
    data.sort((a, b) => (a[key] > b[key] ? 1 : -1));
}

export default DataUtils;
