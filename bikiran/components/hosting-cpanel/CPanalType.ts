export type TEmailUser = {
  displayName: string;
  email: string;
  id: number;
  phone: string;
  photoUrl: string;
  status: string;
  userProfile: any;
  primaryIds: number[];
  primaryProjectId: number;
};

export type TCPanel = {
  id: number;
  projectId: number;
  packageId: number;
  subscriptionId: number;
  subType: string;
  isServerOkay: boolean;
  cPanel: {
    cpHostname: string;
    cpUsername: string;
    cpDomain: string;
    cpNameservers: string;
    cpIp: string;
    cpIpType: string;
    cpPackage: string;
    cpEmail: string;
    cpShell: boolean;
    timeCreated: number;
  };
  cpSuspention: {
    isSuspended: boolean;
    suspendNote: string;
    suspendTime: number;
  };
  status: string;
  user: TEmailUser;
};
export type TFilter = {
  cpDomain: string;
  cpUsername: string;
  hostname: string[];
  status: string[];
};

export type TSubsData = {
  subscription: {
    id: number;
    title: string;
    domain: string;
    cpLimit: number;
    cpUsed: number;
    status: string;
  };
  user: {
    id: number;
    displayName: string;
    email: string;
    phone: string;
    photoUrl: string;
    status: string;
    userProfile: any;
    primaryIds: number[];
    primaryProjectId: number;
  };
};
