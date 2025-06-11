import exp from "constants";

export type TActivityUser = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
  userProfile: any;
  primaryIds: number[];
  primaryProjectId: number;
};

export type TUserActivityLogs = {
  id: number;
  projectId: number;
  subscriptionId: number;
  assetKey: string;
  assetId: number;
  activityKey: string;
  title: string;
  description: string;
  weight: string;
  timeCreated: number;
  user: TActivityUser;
};
