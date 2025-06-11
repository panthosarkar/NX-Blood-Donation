export type TServer = {
  id: number;
  type: string;
  title: string;
  hostname: string;
  primaryIp: string;
  licenseQuota: number;
  licenseUsed: number;
  note: string;
  status: string;
  timeSynced: number;
  username: string;
};
