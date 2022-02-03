import { sum } from "./array";

/**
 * Normalize data to percentage relative to the sum of all the keys
 */
export const normalizeDataToPercent = (
  data: Array<any>,
  keys: Array<string>
): Array<any> =>
  data.map((d: any) => {
    const total = keys.map((state) => d[state]).reduce((e, acc) => acc + e, 0);
    keys.forEach((state) => (d[state] = (d[state] / total) * 100));
    d.total = total;
    return d;
  });

export function normalizeToPercentWithTotal<
  T extends Record<string, number>,
  K extends keyof T
>(object: T) {
  const total = sum(Object.values(object));
  const copy: T = { ...object };

  for (const [key, value] of Object.entries(object)) {
    copy[key as K] = ((value / total) * 100) as T[K];
  }

  return { ...copy, total };
}

export const sortByKey = (data: [], key: string): [] =>
  data.sort((a, b) => (a[key] > b[key] ? 1 : -1));
