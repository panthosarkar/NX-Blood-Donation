export type TAppsStorageListItem = {
  id: number;
  name: string;
  photoUrl: string;
  email: string;
  phone: string;
  organization: string;
  source: string;
  status: string;
  address: string;
  addressZip: string;
  matches: any[];
  apps: any;
};

export type TStatus = {
  status: string[];
};
