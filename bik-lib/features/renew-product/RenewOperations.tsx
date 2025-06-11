import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { TRenewData } from "./renewProductTypes";

export const ApiLoadRenewData = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<{ scopes: TRenewData[] }>) => void,
  subscriptionId: number,
  projectId: number
) => {
  const {
    data,
  }: {
    data: TApiResponse<{ scopes: TRenewData[] }>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(
      `${getApi2Url()}/renew/project/${projectId}/contract/${subscriptionId}/scopes`
    )
    .get({});
  chkLoginReq(data);
  if (data.error) {
    throw new Error(data.message);
  }

  return data;
};

export const ApiCreateRenewInvoice = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  projectId: number,
  payload: {
    subscriptionIds: number[];
  }
) => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(`${getApi2Url()}/renew/project/${projectId}/create-invoice`)
    .post(payload);
  chkLoginReq(data);
  if (data.error) {
    throw new Error(data.message);
  }

  return data;
};
