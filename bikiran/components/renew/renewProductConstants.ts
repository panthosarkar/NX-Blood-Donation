import { TRenewData } from "./renewProductTypes";

export const initialRenewData: TRenewData = {
  currency: "",
  billingAccounts: [
    {
      id: 0,
      title: "",
      currency: "",
    },
  ],
  project: {
    id: 0,
    title: "",
    faviconUrl: "",
    status: "",
    url: "",
  },
  scopes: [
    {
      subscriptionId: 0,
      subscriptionType: "",
      title: "",
      subTitle: "",
      currency: "",
      price: 0,
      quantity: 0,
      unitName: "",
      totalPrice: 0,
      isChecked: false,
      priceOffer: 0,
      packageId: 0,
      assetKey: "",
      domain: "",
    },
  ],
  notFound: false,
} as const;
