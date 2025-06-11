export type TDomainUser = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
};

export type TProject = {
  id: number;
  title: string;
  faviconUrl: string;
  status: string;
  url: string;
};

export type TDomainListItem = {
  id: number;
  domainName: string;
  timeExpire: number;
  expireRemain: number;
  contractPrice: number;
  contractPriceUSD: number;
  contractDuration: number;
  contractUnitName: string;
  contractCurrency: string;
  contractCurrencyRate: number;
  contractVatPercent: number;
  contractPriceOffer: number;
  contractPriceOfferUSD: number;
  isVerified: boolean;
  status: string;
  domainStatus: string;
  domainNote: string;
  title: string;
  project: TProject;
  user: TDomainUser;
};
export type TCurrency = {
  currency: string;
  rate: number;
};

export type TAddDomainPayload = {
  user: string;
  contractCurrency: string;
  contractCurrencyRate: number;
  domainName: string;
  contractPrice: number;
  contractPriceOffer: number;
  title: string;
  subscriptionStart: string | number;
  subscriptionEnd: string | number;
  contractVatPercent: number;
  note: string;
};

export type TDomainPackage = {
  packageId: number;
  vendor: string;
  price: number;
  priceOffer: number;
  vat: number;
  title: string;
  timeRegister: number;
  timeExpire: number;
};
