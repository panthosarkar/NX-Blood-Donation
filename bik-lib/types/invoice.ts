export type TInvoiceInfo = {
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
  totalItem: number;
  totalPrice: number;
  totalPriceOffer: number;
  totalVat: number;
  totalSaving: number;
  totalPaid: number;
  totalDue: number;
  noteTitle: string;
  noteDescription: string;
  status: string;
  gatewayId: number;
};

export type TAddressBilling = {
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
};

export type TAddressShipping = {
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
};

export type TInvoiceProduct = {
  assetKey: string;
  id: number;
  type: string;
  title: string;
  quantity: number;
  unitName: string;
  domain: string;
  price: number;
  priceOffer: number;
  vat: number;
  totalPrice: number;
  duration: string;
  status: string;
  projectId: number;
  description: string;
};

export type TPaymentOption = {
  id: number;
  provider: string;
  title: string;
  subTitle: string;
  buttonText: string;
  isDefault: number;
  icon: string;
  priority: number;
  status: string;
};

export type TPaymentIssue = {
  key: string;
  message: string;
};

export type TAddressPayload = {
  type: string;
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
};

// {
//   "id": 10000006,
//   "displayName": "Noman Gazi",
//   "email": "nomangazix@gmail.com",
//   "phone": "",
//   "photoUrl": "https://storage.googleapis.com/bikiran-portal/profile_picture/2024-12-11/925595678bcea831ce2a820d214f14c1.jpg",
//   "status": "active",
//   "userProfile": null,
//   "primaryIds": [],
//   "primaryProjectId": 0
// }

export type TInvoiceOwner = {
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
export type TCustomerFAC = {
  id: number;
  title: string;
  currency: string;
  balance: number;
};
export type TInvoiceTransaction = {
  transactionId: number;
  projectId: number;
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

export type TInvoiceActivity = {
  id: number;
  activityKey: string;
  title: string;
  description: string;
  timeCreated: number;
  user: {
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
};

export type TInvoiceData = {
  invoice: TInvoiceInfo;
  activity: TInvoiceActivity[];
  invoiceOwner: TInvoiceOwner;
  customerFac: TCustomerFAC;
  items: TInvoiceProduct[];
  addressBilling: TAddressBilling;
  addressShipping: TAddressShipping;
  paymentGateways?: TPaymentOption[];
  paymentIssues?: TPaymentIssue[];
  scopes: string[];
  scopesAvailable: string[];
  linkDownload: string;
  linkPrint: string;
  transactions: TInvoiceTransaction[];
  notFound?: boolean;
};
