export type TCartMenuDuration = {
  quantity: number;
  price: number;
  offerPrice: number;
  save: number;
};
export type TCartMenuData = {
  id: number;
  type: string;
  initId: string;
  title: string;
  domain: string;
  domainSecret: string;
  serviceId: number;
  packageId: number;
  quantity: number;
  durations: TCartMenuDuration[];
  unitName: string;
  price: number;
  priceOffer: number;
  totalPrice: number;
  totalPriceOffer: number;
  nextRenewal: number;
};
