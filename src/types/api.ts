export type URLParams = { [param: string]: string | number };

export interface BladeStatuses {
  busy: number;
  off: number;
  nimby: number;
  free: number;
}

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
    params: undefined;
  };
}

export type GetRoute = keyof GetRoutes;
export type GetResponse<R extends keyof GetRoutes> = GetRoutes[R]["response"];
export type GetParams<R extends keyof GetRoutes> = GetRoutes[R]["params"];
