import { TPagination } from "@/bik-lib/types/response";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";

export type TPremium = {
  contract: TPremiumContract;
  filters: {
    userId: number;
    subscriptionId: number;
    identity: string;
    status: string[];
    currencies: [
      {
        currency: string;
        rate: number;
      },
    ];
    unitNames: string[];
    subtypes: [
      {
        key: string;
        defaultValue: null;
        isPublic: boolean;
        title: string;
      },
    ];
  };
  pagination: TPagination;
};

export type TPremiumContract = [
  {
    id: number;
    projectId: number;
    packageId: number;
    subType: string;
    title: string;
    description: string;
    contractUnitName: string;
    contractCurrency: string;
    contractCurrencyRate: number;
    contractDuration: number;
    contractPrice: number;
    contractPriceOffer: number;
    contractVatPercent: number;
    timeIssue: number;
    timeExpire: number;
    expireRemain: number;
    identityName: string;
    status: string;
    user: {
      id: number;
      displayName: string;
      email: string;
      phone: string;
      photoUrl: string;
      status: string;
      userProfile: null | unknown;
      primaryIds: number[];
      primaryProjectId: number;
    };
  },
];
