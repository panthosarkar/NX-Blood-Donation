export type TProjectInvitationPayload = {
  emails: string[];
  assetKey: string;
  assetId: number;
  role: string;
  permissions: string[];
  invitationAcceptUrl: string;
};

export type TInvAllowedPermission = {
  admin: string[];
  manager: string[];
  viewer: string[];
  developer: string[];
  tester: string[];
};

export type TRole = "admin" | "developer" | "manager" | "tester" | "viewer";
export type TInvAssetList = {
  assetKey: string;
  assetTitle: string;
  assets: string[];
  allowedPermissions: TInvAllowedPermission;
};

export type TProjectInvGuideline = {
  id: number;
  title: string;
  description: string[];
};
