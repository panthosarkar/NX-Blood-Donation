import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { TDomainInfo } from "../../types/domain";
import { TCartDataResponse } from "./cartDataType";

// fetch cart data
export const ApiLoadCartData = async (
  currentUser: CurrentUser
  // chkLoginReq: (data: TApiResponse<any>) => void
): Promise<TApiResponse<TCartDataResponse>> => {
  const {
    data,
  }: {
    data: TApiResponse<TCartDataResponse>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(`${getApi2Url()}/cart`)
    .get({});
  // Check if user is logged in or not0
  // chkLoginReq(data);

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};

// create invoice from cart
export const ApiCreateInvoice = async (
  currentUser: CurrentUser,
  payload: number[]
  //   chkLoginReq: (data: TApiResponse<any>) => void
): Promise<TApiResponse<any>> => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(`${getApi2Url()}/cart/invoice/create`)
    .post(payload);
  // Check if user is logged in or not
  //   chkLoginReq(data);

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};

// delete invoice from cart
export const ApiDeleteCartItem = async (
  currentUser: CurrentUser,
  cartItemId: number
  //   chkLoginReq: (data: TApiResponse<any>) => void
): Promise<TApiResponse<any>> => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(`${getApi2Url()}/cart/item/${cartItemId}/delete`)
    .delete();

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};

// delete invoice from cart
export const ApiEmptyCart = async (
  currentUser: CurrentUser
): Promise<TApiResponse<any>> => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(`${getApi2Url()}/cart/item/empty`)
    .delete();

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};

// update cart item quantity
export const ApiUpdateCartDuration = async (
  currentUser: CurrentUser,
  cartItemId: number,
  quantity: number
  //   chkLoginReq: (data: TApiResponse<any>) => void
): Promise<TApiResponse<any>> => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(
      `${getApi2Url()}/cart/item/${cartItemId}/update-quantity/${quantity}`
    )
    .put({});
  // Check if user is logged in or not
  //   chkLoginReq(data);

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};

// add to cart
export const ApiCartAdd = async (
  currentUser: CurrentUser,
  payload: TDomainInfo
  //   chkLoginReq: (data: TApiResponse<any>) => void
): Promise<TApiResponse<any>> => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(`${getApi2Url()}/cart/domain/add`)
    .post(payload);
  // Check if user is logged in or not
  //   chkLoginReq(data);

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};
