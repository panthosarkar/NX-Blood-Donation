import { TApiResponse } from "@/src/types/response";
import { AxiosAuth } from "@/src/utils/AxiosAPI";

export const ApiSendOtp = async <T extends unknown>(formData: { phone: string | number }): Promise<TApiResponse<T>> => {
  try {
    const { data }: { data: TApiResponse<T> } = await AxiosAuth.setPath("/send/otp").post(formData);

    if (data.error !== 0) {
      throw new Error(data.message);
    }
    return data;
  } catch (ex) {
    throw ex;
  }
};

export const ApiLoginConfirmOtp = async <T extends unknown>(formData: { phone: string | number; otp: string | number }): Promise<TApiResponse<T>> => {
  try {
    const { data }: { data: TApiResponse<T> } = await AxiosAuth.setPath("/login").post(formData);

    if (data.error !== 0) {
      throw new Error(data.message);
    }
    return data;
  } catch (ex) {
    throw ex;
  }
};

export const ApiLoginWithPassword = async <T extends unknown>(formData: { phone: string | number; password: string }): Promise<TApiResponse<T>> => {
  try {
    const { data }: { data: TApiResponse<T> } = await AxiosAuth.setPath("/login/password").post(formData);

    if (data.error !== 0) {
      throw new Error(data.message);
    }
    return data;
  } catch (ex) {
    throw ex;
  }
};

export const ApiLogout = async <T extends unknown>(): Promise<TApiResponse<T>> => {
  try {
    const { data }: { data: TApiResponse<T> } = await AxiosAuth.setPath("/logout").post({});

    if (data.error !== 0) {
      throw new Error(data.message);
    }
    return data;
  } catch (ex) {
    throw ex;
  }
};

export const ApiGetAuthInfo = async <T extends unknown>(): Promise<TApiResponse<T>> => {
  try {
    const { data }: { data: TApiResponse<T> } = await AxiosAuth.setPath("/auth/info").get();

    if (data.error !== 0) {
      throw new Error(data.message);
    }
    return data;
  } catch (ex) {
    throw ex;
  }
};
