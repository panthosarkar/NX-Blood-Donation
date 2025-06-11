export type TDomainPrice = {
  id: number;
  vendor: string;
  classKey: string;
  tld: string;
  price: number;
  pricePromotion: number;
  priceTransferIn: number;
  priceRedemption: number;
  priceRestore: number;
  minQuantity: number;
  selectedQuantity: number;
  status: string;
};

export type TDomainPackagePayload = {
  pricePromotion: number;
  price: number;
  priceTransfer: number;
  priceRedemption: number;
  priceRestore: number;
  minQuantity: number;
  selectedQuantity: number;
  vendor: string;
};

export type TVendor = {
  key: string;
  vendorTitle: string;
  vendorDescription: string;
  website: string;
  partnerPortalUrl: string;
  customerPortalUrl: string;
};
