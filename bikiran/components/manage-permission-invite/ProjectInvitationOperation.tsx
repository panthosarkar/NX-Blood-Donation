import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { TApiResponse } from "@/bik-lib/types/response";
import { TProjectInvitationPayload } from "./projectInvitationTypes";

export const ApiLoadPermissionData = async (
  currentUser: CurrentUser,
  projectId: number
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/permissions/${projectId}`)
      .get();

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiSendPermissionInvitation = async (
  currentUser: CurrentUser,
  payload: TProjectInvitationPayload
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/founder/permission/add`)
      .post(payload);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiLoadAssetNames = async (
  currentUser: CurrentUser
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/project/permission/invite/get-asset-names`)
      .get();

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiLoadAssetList = async (
  currentUser: CurrentUser,
  assetKey: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/project/permission/invite/get-asset-list/${assetKey}`
      )
      .get();

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiResetPermission = async (
  currentUser: CurrentUser,
  projectId: number,
  payload?: TProjectInvitationPayload
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/permissions/${projectId}/reset`)
      .put(payload);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
