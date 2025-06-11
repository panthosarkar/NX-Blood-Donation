import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";

// Upload application logo
export const ApiUploadClientLogo = async (
  authInfo: TAuthInfo,
  clientId: string,
  formData: any,
  chkLoginReq: (data: TApiResponse<any>) => void
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`${getApi2Url()}/admin/client/${clientId}/logo`)
      .put(formData, { headers: { "Content-Type": "multipart/form-data" } });
    chkLoginReq(response.data);
    if (response.data.error === true) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (ex) {
    throw ex;
  }
};

// Delete client data
export const ApiDeleteClientData = async (
  authInfo: TAuthInfo,
  clientId: string
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`${getApi2Url()}/admin/client/${clientId}/delete`)
      .delete();

    if (response.data.error === true) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (ex) {
    throw ex;
  }
};
