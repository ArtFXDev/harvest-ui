import { Group, GroupID } from "./fog";
import { Blade } from "./tractor";

export type URLParams = { [param: string]: string | number };

export const BLADE_STATUSES = [
  "busy",
  "free",
  "nimby",
  "noFreeSlots",
  "off",
] as const;
export type BladeStatus = typeof BLADE_STATUSES[number];
export type BladeStatuses = { [K in BladeStatus]: number };

type WithTimestamp<T> = T & { createdAt: string };

export interface GetRoutes {
  "current/blade-usage": {
    response: BladeStatuses;
    params: undefined;
  };
  "current/project-usage": {
    response: { [project: string]: number };
    params: undefined;
  };
  "info/projects": { response: string[]; params: undefined };
  "info/compute-time": {
    response: { hours: number; minutes: number };
    params: { start: number; end: number };
  };
  "info/blades": { response: { blades: Blade[] }; params: undefined };
  "history/blade-usage": {
    response: WithTimestamp<BladeStatuses>[];
    params: { start: number; end: number };
  };
  "history/project-usage": {
    response: WithTimestamp<{ [project: string]: number }>[];
    params: { start: number; end: number };
  };
  "fog/groups": {
    response: { [groupID: GroupID]: Group };
    params: undefined;
  };
}

export type GetRoute = keyof GetRoutes;
export type GetResponse<R extends keyof GetRoutes> = GetRoutes[R]["response"];
export type GetParams<R extends keyof GetRoutes> = GetRoutes[R]["params"];
