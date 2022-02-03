export type URLParams = { [param: string]: string | number };

export const BLADE_STATUSES = ["off", "nimby", "free", "busy"] as const;
export type BladeStatuses = { [K in typeof BLADE_STATUSES[number]]: number };

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
  "history/blade-usage": {
    response: (BladeStatuses & {
      createdAt: string;
    })[];
    params: { start: number; end: number };
  };
}

export type GetRoute = keyof GetRoutes;
export type GetResponse<R extends keyof GetRoutes> = GetRoutes[R]["response"];
export type GetParams<R extends keyof GetRoutes> = GetRoutes[R]["params"];
