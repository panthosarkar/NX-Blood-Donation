export type TBillingAccount = {
  id: number;
  title: string;
  currency: string;
};

export type TRenewProject = {
  id: number;
  title: string;
  faviconUrl: string;
  status: string;
  url: string;
};

export type TRenewProduct = {
  subscriptionId: number;
  subscriptionType: string;
  title: string;
  subTitle: string;
  currency: string;
  quantity: number;
  unitName: string;
  totalPrice: number;
  priceOffer: number;
  price: number;
  isChecked: boolean;
  packageId: number;
  assetKey: string;
  domain: string;
};

export type TRenewData = {
  currency: string;
  billingAccounts: TBillingAccount[];
  scopes: TRenewProduct[];
  project: TRenewProject;
  notFound?: boolean;
};

export type TRenewProductPayload = {
  primarySubscriptionId: number;
  currency: string;
  // billingAccountId: number;
  subscriptionIds: number[];
};
