import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import AxiosAuth from "@/bik-lib/utils/AxiosAPI";

// Get Docs Content by application id and language
export const ApiGetDocsContentInfo = async (
  authInfo: TAuthInfo,
  applicationName: string,
  menuId: number
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`/admin/application/`, {
        applicationName,
        menuId: menuId.toString(),
      })
      .get();

    if (response.data.error === true) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (ex) {
    throw ex;
  }
};

export const ApiDocsMenuContentSave = async (
  authInfo: TAuthInfo,
  applicationId: number,
  menuId: number,
  contentId: number,
  formData: object
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`/admin/application/`, {
        applicationId: applicationId.toString(),
        menuId: menuId.toString(),
        contentId: contentId.toString(),
      })
      .post(formData);

    if (response.data.error === true) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (ex) {
    throw ex;
  }
};
