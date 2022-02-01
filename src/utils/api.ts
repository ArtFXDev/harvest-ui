import axios from "axios";

export function apiURL(route: string): string {
  return `${process.env.REACT_APP_HARVEST_API_URL}/${route}`;
}

export async function apiGet<T>(route: string): Promise<T> {
  return (await axios.get<T>(apiURL(route))).data;
}

/**
 * Transforms an object to a list of {name: key, value: value}
 * Ex: {nimby: 0, off: 50} -> [{name: "nimby", value: 0}, {name: "off", value: 50}]
 */
export function toNameValue<T>(
  object: { [key: string]: T } | undefined
): { name: string; value: T }[] | undefined {
  if (!object) return undefined;
  return Object.keys(object).map((key) => ({ name: key, value: object[key] }));
}
