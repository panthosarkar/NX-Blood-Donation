import { TPagination } from "@/bik-lib/types/response";

export interface IAccountAdmContext {
  data: TAccountAdmData[] | null | undefined;
  pagination: TPagination;
  reFetching: boolean;
  reFetch: () => void;
  filters: TAccountFilters;
}

export type TAccountAdmData = {
  id: number;
  currency: string;
  type: string;
  title: string;
  note: string;
  isPrimary: boolean;
  status: string;
  creator: number;
  timeCreated: number;
  timeLastTransaction: number;
  balance: TBalance;
  user: User;
};

type User = {
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

export type TBalance = {
  facId: number;
  facType: string;
  credit: number;
  debit: number;
  balance: number;
  currency: string;
};

export type TCreditInfo = () => {
  creditSide: any;
  debitSide: any;
};

export type TDebitCredit = {
  user: User;
  fac: TBalance;
};

export type TAccountFilters = {
  status: string[];
  projectId: string;
  userId: string;
  currency: [
    {
      currency: string;
      title: string;
    },
  ];
  types: [
    {
      key: string;
      title: string;
      defaultValue: any;
      isPublic: boolean;
    },
  ];
};
