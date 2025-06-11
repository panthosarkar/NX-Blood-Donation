export type TPaymentMethod = {
  gateways: TPaymentData[];
  filters: TPaymentFilters;
};

export type TPaymentFilters = {
  statusOptions: string[];
  currencyOptions: [
    {
      currency: string;
      title: string;
    },
  ];
};

export type TPaymentData = {
  id: number;
  title: string;
  subTitle: string;
  currencyPayment: string;
  buttonText: string;
  icon: string;
  isDefault: number;
  provider: string;
  priority: number;
  status: string;
  creator: number;
  timeCreated: number;
  timeUpdated: number;
};
