export type TDomainProperty = {
  domainName: string;
  tld: string;
  isAvailable: boolean;
};

export type TDomainDuration = {
  quantity: number;
  price: number;
  offerPrice: number;
  save: number;
};

export type TDomainInfo = {
  packageId: number;
  assetKey: string;
  cartItemId: number;
  title: string;
  minQuantity: number;
  selectedQuantity: number;
  price: number;
  priceRenew: number;
  durations: TDomainDuration[];
  unitName: string;
  domainName: string;
  domainProperty: TDomainProperty;
  hostingProperty: any;
};
