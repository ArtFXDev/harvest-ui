import ColorHash from "color-hash";
import { BladeStatuses } from "types/api";

const colorHash = new ColorHash({ lightness: 0.7, saturation: 0.9 });

/**
 * Converts a string into a hex formatted color
 */
export function getColorFromString(str: string): string {
  return colorHash.hex(str);
}

export function getDarkerColorFromString(str: string): string {
  return new ColorHash({ lightness: 0.7, saturation: 0.5 }).hex(str);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerpColor(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number,
  t: number
): string {
  return `rgb(${lerp(r1, r2, t)}, ${lerp(g1, g2, t)}, ${lerp(b1, b2, t)})`;
}

/**
 * Constant colors used in the theme
 */
export const COLORS = {
  red: "rgb(232, 66, 59)",
  purple: "#b0358b",
  green: "rgb(21, 175, 151)",
  blue: "#009bd9",
};

/**
 * Colors associated with each blade status
 */
export const BLADE_STATUS_COLOR: { [key in keyof BladeStatuses]: string } = {
  busy: COLORS.red,
  free: COLORS.green,
  nimby: COLORS.blue,
  off: COLORS.purple,
  noFreeSlots: "#654e8d",
  bug: "#e0497a",
};

export const TASK_STATUS_COLOR = {
  numerror: COLORS.red,
  numdone: COLORS.green,
  numready: COLORS.blue,
  numblocked: COLORS.purple,
};
