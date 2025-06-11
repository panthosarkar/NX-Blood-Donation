import { TPagination } from "@/bik-lib/types/response";

export type TUserProp = {
  id: number;
  name: string;
  photoUrl: string;
  email: string;
  tfaEnabled: boolean;
  billingEnabled: boolean;
  projectLimit: number;
  status: string;
};
export type TUserPropResponse = {
  users: TUserProp[];
  status: string[];
  pagination: TPagination;
};
