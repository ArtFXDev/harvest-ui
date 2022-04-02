/**
 * Returns true if the two objects are equal at a single depth
 * meaning that it only compares the values at the top level
 */
export function singleDepthEqual(
  a: Record<string, unknown>,
  b: Record<string, unknown>
) {
  for (const keyA in a) {
    if (!b[keyA] || b[keyA] !== a[keyA]) return false;
  }

  return true;
}
