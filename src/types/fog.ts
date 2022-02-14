const inventoryFields = [
  "id",
  "hostID",
  "primaryUser",
  "other1",
  "other2",
  "createdTime",
  "deleteDate",
  "sysman",
  "sysproduct",
  "sysversion",
  "sysserial",
  "sysuuid",
  "systype",
  "biosversion",
  "biosvendor",
  "biosdate",
  "mbman",
  "mbproductname",
  "mbversion",
  "mbserial",
  "mbasset",
  "cpuman",
  "cpuversion",
  "cpucurrent",
  "cpumax",
  "mem",
  "hdmodel",
  "hdserial",
  "hdfirmware",
  "caseman",
  "casever",
  "caseserial",
  "caseasset",
  "memory",
] as const;
type Inventory = { [K in typeof inventoryFields[number]]: string };

export type HostID = string;
export interface Host {
  id: HostID;
  name: string;
  description: string;
  ip: string;
  imageID: string;
  building: string;
  createdTime: string;
  deployed: string;
  createdBy: string;
  useAD: string;
  ADDomain: string;
  ADOU: string;
  ADUser: string;
  ADPass: string;
  ADPassLegacy: string;
  productKey: string;
  printerLevel: string;
  kernelArgs: string;
  kernel: string;
  kernelDevice: string;
  init: string;
  pending: string;
  pub_key: string;
  sec_tok: string;
  sec_time: string;
  pingstatus: string;
  biosexit: string;
  efiexit: string;
  enforce: string;
  primac: string;
  imagename: null;
  hostscreen: unknown;
  hostalo: unknown;
  inventory: Inventory;
  image: unknown;
  pingstatuscode: number;
  pingstatustext: string;
  macs: string[];
}

export type GroupID = string;
export interface Group {
  id: GroupID;
  name: string;
  description: string;
  createdBy: string;
  createdTime: string;
  building: string;
  kernel: string;
  kernelArgs: string;
  kernelDevice: string;
  hostcount: number;

  hosts: { [hostID: HostID]: Host };
}
