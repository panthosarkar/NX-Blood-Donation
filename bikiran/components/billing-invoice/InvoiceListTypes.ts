import { TPagination } from "@/bik-lib/types/response";
export type TInvoiceCurrency = {
  currency: string;
  rate: number;
};

export type TInvoiceTableItem = {
  id: number;
  customId: string;
  invoiceTitle: string;
  localCurrency: string;
  convertRatio: number;
  timeIssue: number;
  timeDue: number;
  paymentStatus: string;
  paymentTime: number;
  noteTitle: string;
  noteDescription: string;
  status: string;
  numOfItem: number;
  priceOfferTotal: number;
  priceTotal: number;
  amountPaid: number;
  amountVat: number;
  domain: string;
  user: TInvoiceUser;
};

export type TInvoiceDataResponse = {
  currencies: TInvoiceCurrency[];
  currencites?: TInvoiceCurrency[];
  pagination: TPagination;
  invoices: TInvoiceTableItem[];
};

export type TInvoiceCreatePayload = {
  user: string;
  currency: string;
  ratio: number;
};

export type TSearchUser = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
};
export type TInvoiceUser = {
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
