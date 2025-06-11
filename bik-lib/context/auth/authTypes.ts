import { User, UserInfo } from "firebase/auth";

export type TAuthUser = {
  name: string;
  username: string;
  sex: string;
  genderTxt: string;
  dob: string;
  dobText: string;
  phone: string;
  email: string;
  photoUrl: string;
  userUid: string;
  refreshToken: string;
};

export type TAuthInfo = {
  loading: boolean;
  currentUser: TAuthUser;
  error: boolean;
  message: string;
  referenceName?: string;
  provider?: string;
};

export type TAuthInfoFire = {
  loginState: boolean | "loading";
  user: User | null;
  userInfo: UserInfo | null;
};
