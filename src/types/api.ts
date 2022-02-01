export interface GetRoutes {
  "current/blade-usage": { [status: string]: number };
  "current/project-usage": { [project: string]: number };
}

export type GetRoute = keyof GetRoutes;
