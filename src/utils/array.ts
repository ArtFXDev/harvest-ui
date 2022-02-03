/**
 * Returns the sum of an array of numbers
 */
export function sum(array: number[]) {
  return array.reduce((a: number, b: number) => a + b, 0);
}

/**
 * Returns the last element of a list
 */
export function last<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[array.length - 1];
}
