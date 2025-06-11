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

export type TUserEmailsItem = {
  id: number;
  identity: string;
  identityType: string;
  isVerified: boolean;
  provider: string;
  status: string;
  isPrimary: boolean;
  user: TEmailUser;
};
export type TAddEmails = {
  userId: number;
  email: string;
};
