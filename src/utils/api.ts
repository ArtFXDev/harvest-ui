import axios from "axios";
import { GetParams, GetResponse, GetRoutes } from "types/api";

/**
 * Constructs a full url to the API
 */
export function apiURL(route: string): string {
  return `${process.env.REACT_APP_HARVEST_API_URL}/${route}`;
}

/**
 * Typed get method on the API
 * Returns a promise with the data
 */
export async function apiGet<R extends keyof GetRoutes>(
  route: R,
  params: Partial<GetParams<R>>
): Promise<GetResponse<R>> {
  let fullRoute = route as string;

  // Add optional URL params
  if (Object.keys(params).length > 0) {
    fullRoute += "?";
    fullRoute += Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  const request = await axios.get(apiURL(fullRoute), params);
  return request.data;
}

/**
 * Transforms an object to a list of {name: key, value: value}
 *
 * Ex: {nimby: 0, off: 50} -> [{name: "nimby", value: 0}, {name: "off", value: 50}]
 */
export function toNameValue<T>(
  object: { [K in keyof T]: T[K] } | undefined
): { name: string; value: T }[] | undefined {
  if (!object) return undefined;
  return Object.entries(object).map(([key, value]) => ({
    name: key,
    value: value as T,
  }));
}
