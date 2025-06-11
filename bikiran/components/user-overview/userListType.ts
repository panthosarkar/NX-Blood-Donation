export type TUserListItem = {
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
};
export type TUserCreatePayload = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  note: string;
};

export type TStatus = {
  status: string[];
};
export type TOverview = {
  addresses:TAddress[],
  emails:TEmail[],
  phones:TPhone[],
  userProfile:TUserProfile,
  projects : TProject[]
}
export type TPhone = {
  id: number;
  identity: string;
  identityType: string;
  isVerified: boolean;
  status: string;
  isPrimary: boolean;
};

export type TAddress = {
  id: number;
  name: string;
  organization: string;
  email: string;
  mobile: string;
  telephone: string;
  fax: string;
  line1: string;
  line2: string;
  line3: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  isPrimary: boolean;
  status: string;
};
export type TEmail = {
  id: number;
  identity: string;
  provider: string;
  identityType: string;
  isVerified: boolean;
  status: string;
  isPrimary: boolean;
};

export type TUserProfile = {
  id: number;
  type: string;
  displayName: string;
  username: string;
  photoUrl: string;
  sex: string;
  dobLong: number;
  dobString: string;
  suspensionReason: string;
  isTwoFaEnabled: boolean;
  source: string;
  status: string;
  creator: number;
  ipString: string;
  timeCreated: number;
};
export type TProject = {
  id: number;
  title: string;
  domain: string;
  faviconUrl: string;
  isPrimary: boolean;
  contactName: string;
  phone: string;
  status: string;
};