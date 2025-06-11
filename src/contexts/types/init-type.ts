import { TState } from "@/src/types/event";

export interface IInitProductInfo {
  id: number;
  title: string;
  price: number;
  price_offer: number;
  photo_url: string;
  variation_ar: Record<string, any>;
  variation_header: any;
}

export interface ICategoryList {
  categoryName: string;
  id: number;
  subCategory: ICategoryList[];
}

export interface ICampaignList {
  id: number;
  title: string;
  discount_percent: number;
  end_time: number;
  photo_url: string;
  start_time: number;
}

export interface IInitInfo {
  campaignList: ICampaignList[];
  categoryList: ICategoryList[];
  featureProductList: unknown[];
  productsInfo: {
    exclusive: IInitProductInfo[];
    new: IInitProductInfo[];
    list: IInitProductInfo[];
  };
  initId: string;
  error: boolean;
  message: string;
}

export type InitContextType = {
  initInfo: IInitInfo;
  authReloadKey: number;
  setAuthReloadKey: TState<number>;
  setInitInfo: TState<IInitInfo>;
  totalCartItems: { reload: number; total: number };
  setTotalCartItems: TState<{ reload: number; total: number }>;
  totalWishlistItems: { reload: number; total: number };
  setTotalWishlistItems: TState<{ reload: number; total: number }>;
  initLoading: boolean;
};
