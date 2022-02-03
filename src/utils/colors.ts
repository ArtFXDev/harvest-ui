import ColorHash from "color-hash";
import { BladeStatuses } from "types/api";

const colorHash = new ColorHash({ lightness: 0.7, saturation: 0.9 });

/**
 * Converts a string into a hex formatted color
 */
export function getColorFromString(str: string): string {
  return colorHash.hex(str);
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
};
