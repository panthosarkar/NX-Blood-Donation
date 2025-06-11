import { TDomainDuration } from "@/bik-lib/types/domain";

export type TCartData = {
  id: number;
  type: string;
  initId: string;
  domain: string;
  domainSecret: string;
  serviceId: number;
  packageId: number;
  quantity: number;
  durations: TDomainDuration[];
  unitName: string;
  price: number;
  priceOffer: number;
  totalPrice: number;
  totalPriceOffer: number;
  nextRenewal: number;
};

export type TCartSummery = {
  totalPrice: number;
  totalPriceOffer: number;
  save: number;
};

export type TCartDataResponse = {
  cartItems: TCartData[];
  cartSummery: TCartSummery;
};
