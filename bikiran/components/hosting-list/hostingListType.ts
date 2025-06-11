import { TPagination } from "@/bik-lib/types/response";

export type TUser = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
  userProfile: any;
};

export type THostingListItem = {
  id: number;
  domainName: string;
  timeExpire: number;
  expireRemain: number;
  contractPrice: number;
  contractCurrency: string;
  contractCurrencyRate: number;
  contractPriceOffer: number;
  contractPriceUSD: number;
  contractDuration: number;
  contractUnitName: string;
  contractVatPercent: number;
  contractPriceOfferUSD: number;
  user: TUser;
  status: string;
  title: string;
  cpLimit: number;
  cpUsed: number;
};

export type THostingCreatePayload = {
  userId: number;
  title: string;
  domain: string;
  packageId: number;
  contractDuration: number;
  contractUnitName: string;
  contractCurrency: string;
  contractCurrencyRate: number;
  dateStarted: string;
  contractPrice: number;
  contractPriceOffer: number;
  contractVatPercent: number;
};
export type TCurrency = {
  currency: string;
  rate: number;
};

export type TPackage = {
  id: number;
  title: string;
};

export type TCpServers = {
  hostname: string;
};

export type THostingListData = {
  hostings: THostingListItem[];
  currencies: TCurrency[];
  packages: TPackage[];
  status: string[];
  cpServers: TCpServers[];
  pagination: TPagination;
};
