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

export type TUserPhonesItem = {
  id: number;
  identity: string;
  identityType: string;
  isVerified: boolean;
  status: string;
  isPrimary: boolean;
  user: TPhoneUser;
};
