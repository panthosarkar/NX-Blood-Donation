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

export type TBankCurrency = {
  currency: string;
  title: string;
};

export type TBankAccount = {
  id: number;
  currency: string;
  bankInfo: {
    currency: string;
    bankName: string;
    branch: string;
    routingNumber: string;
    swift: string;
    accountName: string;
    accountNumber: string;
    uniqueName: string;
  };
  status: string;
  timeCreated: number;
};

export type TBankResponse = {
  accounts: TBankAccount[];
  currencies: TBankCurrency[];
};

// Payloads
export type TAddAccountPayload = {
  currency: string;
  bankName: string;
  branch: string;
  routingNumber: string;
  swift: string;
  accountName: string;
  accountNumber: string;
  uniqueName: string;
};

export type TUpdateAccountStPayload = {
  status: string;
  note: string;
};
