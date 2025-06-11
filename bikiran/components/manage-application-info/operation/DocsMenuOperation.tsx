import AxiosAuth from "@/bik-lib/utils/AxiosAPI";
import { SetStateAction } from "react";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";

// todo: Optimize the code, reduce the unnecessary code
// Post
export const ApiCreateDocsMenu = async (
  authInfo: TAuthInfo,
  applicationId: number,
  parentId: number,
  formData: object,
  setIsError: SetStateAction<string | any>
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`/admin/application/menu`)
      .post(formData);

    if (response.data.error === true) {
      setIsError(response.data.reference);
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (ex) {
    throw ex;
  }
};

// Put method
export const ApiUpdateDocsMenu = async (
  authInfo: TAuthInfo,
  applicationId: number,
  menuId: number,
  formData: object,
  setIsError: SetStateAction<string | any>
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`/admin/application/menu`)
      .put(formData);

    if (response.data.error === true) {
      setIsError(response.data.reference);
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (ex) {
    throw ex;
  }
};

// Patch Method -> Priority Update
export const ApiReorderDocsMenu = async (
  authInfo: TAuthInfo,
  applicationId: number,
  priorityArr: object
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`/api/application/menu`)
      .patch(priorityArr);

    if (response.data.error === true) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (ex) {
    throw ex;
  }
};

// todo: Optimize the code, reduce the unnecessary code
// Options Method -> Sub Menu Priority Update
// /api/application/menu?applicationId=0&parentId=0
export const ApiReorderDocSubMenu = async (
  authInfo: TAuthInfo,
  applicationId: number,
  parentId: number,
  formData: object
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo).setUrl(
      `/api/application/menu`
    );
    // .options(formData);

    if (response.data.error === true) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (ex) {
    throw ex;
  }
};
