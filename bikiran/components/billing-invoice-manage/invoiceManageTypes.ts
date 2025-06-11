export type TInvoiceCalc = {
  totalItem: number;
  totalPrice: number;
  totalPriceOffer: number;
  totalVat: number;
  totalSaving: number;
  totalPaid: number;
  totalPrincipalPaid: number;
  totalVatPaid: number;
  totalPrincipleDue: number;
  totalVatDue: number;
  totalDue: number;
};

export type TInvoiceOwner = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
  status: string;
  userProfile: null;
  primaryIds: number[];
  primaryProjectId: number;
};

export type TCustomerFac = {
  id: number;
  title: string;
  currency: string;
  balance: number;
};

export type TInvoiceItem = {
  id: number;
  title: string;
  description: string;
  quantity: number;
  unitName: string;
  domain: string;
  assetKey: string;
  subscriptionStart: number;
  price: number;
  priceOffer: number;
  vat: number;
  totalPrice: number;
  duration: string;
  packageData: {
    disk: number;
    bandwidth: number;
    cpu: number;
    ram: number;
    ep: number;
    io: number;
  };
};

export type TInvoiceTransaction = {
  transactionId: number;
  type: string;
  debitAccountId: number;
  creditAccountId: number;
  transactionCurrency: string;
  transactionAmount: number;
  usdRate: number;
  note: string;
  status: string;
  creator: number;
};

export type TInvoiceScope = string;

export type TInvoiceActivityUser = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
  status: string;
  userProfile: null;
  primaryIds: number[];
  primaryProjectId: number;
};

export type TInvoiceActivity = {
  id: number;
  activityKey: string;
  title: string;
  description: string;
  timeCreated: number;
  user: TInvoiceActivityUser;
};

export type TInvoiceResponse = {
  invoice: TInvoice;
  invoiceCalc: TInvoiceCalc;
  invoiceOwner: TInvoiceOwner;
  customerFac: TCustomerFac;
  items: TInvoiceItem[];
  addressBilling: TBillingAddress;
  addressShipping: TShippingAddress;
  transactions: TInvoiceTransaction[];
  scopes: TInvoiceScope[];
  scopesAvailable: TInvoiceScope[];
  linkPrint: string;
  linkDownload: string;
  activity: TInvoiceActivity[];
  notFound: boolean;
};
export type TBillingAddress = {
  name: string;
  organization: string;
  email: string;
  mobile: string;
  telephone?: string;
  fax?: string;
  line1: string;
  line2?: string;
  line3?: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
};
export type TShippingAddress = {
  name: string;
  organization: string;
  email: string;
  mobile: string;
  telephone?: string;
  fax?: string;
  line1: string;
  line2?: string;
  line3?: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
};

export type TInvoice = {
  id: number;
  customId: string;
  userId: number;
  projectId: number;
  billingId: number;
  invoiceTitle: string;
  localCurrency: string;
  convertRatio: number;
  paymentStatus: string;
  paymentTime: number;
  timeIssue: number;
  timeDue: number;
  gatewayId: number;
  totalItem: number;
  // totalPrice: number;
  // totalPriceOffer: number;
  // totalVat: number;
  // totalSaving: number;
  // totalPaid: number;
  // totalDue: number;
  noteTitle: string;
  noteDescription: string;
  status: string;
};
