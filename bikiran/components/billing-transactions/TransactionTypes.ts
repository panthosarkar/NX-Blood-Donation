type UserProfile = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
};

export type TTransaction = {
  transactionId: number;
  invoiceId: number;
  project: string | null;
  description: string;
  debitAmount: number;
  creditAmount: number;
  currency: string;
  balance: number;
  type: string;
  note: string;
  status: string;
  timeCreated: number;
};

export type TFilterOptionTr = {
  accounts: TrAccount[];
  trCurrency: string[];
  trStatus: string[];
  trType: string[];
};

export type TrAccount = {
  id: number;
  title: string;
};
