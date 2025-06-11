import axios from "axios";
import { AuthData } from "./AuthData";
import { parseToken, validateToken } from "../utils/tokens";
import { getApi2Url } from "@/bik-lib/utils/Env";

interface AuthResponse {
  error: number;
  message: string;
  data: any;
}

const AuthVerify = async (
  userUid: string,
  refreshToken: string
): Promise<AuthData> => {
  const authApi = `${getApi2Url()}/api3/auth/verify`;

  try {
    const response = await axios.get<AuthResponse>(authApi, {
      headers: {
        "Content-Type": "application/json",
        "User-Uid": userUid,
        "Refresh-Token": refreshToken,
      },
    });

    if (response.data.error !== 0) {
      throw new Error(response.data.message);
    }

    return new AuthData(response.data.data);
  } catch (ex: any) {
    throw ex;
  }
};

export const AuthVerify2 = (authorization: string): AuthData | null => {
  // Check if authorization token is valid or not
  if (!validateToken(authorization)) {
    return null;
  }

  const authInfo = parseToken(authorization);

  const authData = new AuthData({});
  authData.id = authInfo?.userId || 0;

  return authData;
};

export default AuthVerify;
