import axios from "axios";

export function apiURL(route: string): string {
  return `${process.env.REACT_APP_HARVEST_API_URL}/${route}`;
}

export async function apiGet<T>(route: string): Promise<T> {
  return (await axios.get<T>(apiURL(route))).data;
}

export async function getBladeStatus(): Promise<{ [status: string]: number }> {
  return apiGet("stats/blade-status");
}

export function toNameValue<T>(object: { [key: string]: T } | undefined) {
  if (!object) return undefined;
  return Object.keys(object).map((key) => ({ name: key, value: object[key] }));
}
