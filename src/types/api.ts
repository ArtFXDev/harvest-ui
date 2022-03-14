import { Group, GroupID } from "./fog";
import { Blade, Job } from "./tractor";

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

export const TASK_STATUSES = [
  "numblocked",
  "numdone",
  "numerror",
  "numready",
] as const;
export type TaskStatus = typeof TASK_STATUSES[number];
export type TaskStatuses = { [K in TaskStatus]: number };

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
  "info/jobs": {
    response: { rc: number; msg: string; rows: Job[] };
    params: undefined;
  };
  "info/jobs-per-owner": {
    response: { [owner: string]: number };
    params: undefined;
  };
  "info/jobs-per-project": {
    response: { [project: string]: { jobs: number; tasks: number } };
    params: undefined;
  };
  "info/task-status-per-project": {
    response: {
      numdone: number;
      numerror: number;
      numready: number;
      numblocked: number;
    }[];
    params: undefined;
  };
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
