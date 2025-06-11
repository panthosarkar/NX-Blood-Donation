export type TPhoneUser = {
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

export type TUserProjectsItem = {
  id: number;
  title: string;
  identityType: string;
  isVerified: boolean;
  status: string;
  isPrimary: boolean;
  domain: string;
  phone: string;
  user: TPhoneUser;
};
