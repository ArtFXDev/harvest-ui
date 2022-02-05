import { sum } from "./array";

/**
 * Normalize values of an object to percentage
 * Ex: {a: 50, b: 10} -> {a: 83.3, b: 16.6, total: 60}
 */
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
