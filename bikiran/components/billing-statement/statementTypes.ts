export type TStatement = {
  account: TStatementAccount;
  transactions: TStatementTransaction[];
};

export type TStatementTransaction = {
  transactionId: number;
  creditAmount: number;
  debitAmount: number;
  balance: number;
  timeTransaction: number;
  description: string;
};

export type TStatementAccount = {
  accountId: number;
  currency: string;
  type: string;
  title: string;
  note: string;
  accountOpened: number;
  lastTrsaction: number;
  user: TStatementUser;
  address: any;
  devNote: string;
};

export type TStatementUser = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
  status: string;
  userProfile: any;
  primaryIds: any[];
  primaryProjectId: number;
};
