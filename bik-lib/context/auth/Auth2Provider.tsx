"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useCom2, sendToChild } from "./Com2Provider";
import { TAuthInfo } from "./authTypes";
import { getAccountUrl } from "@/bik-lib/utils/Env";
import { TApiResponse } from "@/bik-lib/types/response";
import { usePathname } from "next/navigation";

interface AuthContextType {
  authInfo: TAuthInfo;
  logOut: () => void;
  loginUrl: string;
  chkLoginReq: (data: TApiResponse<any>) => void;
}

const initialState: TAuthInfo = {
  loading: true,
  currentUser: {
    name: "",
    username: "",
    sex: "",
    genderTxt: "",
    dob: "",
    dobText: "",
    phone: "",
    email: "",
    photoUrl: "",
    userUid: "",
    refreshToken: "",
  },
  error: false,
  message: "",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth2() {
  const context = useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth2 must be used within an Auth2Provider");
  // }
  return context as AuthContextType;
}

// export const goToLogin = () => {
//   if (typeof window !== "undefined") {
//     const urlEncode = encodeURIComponent(location.href);
//     location.href = `${getAccountUrl()}/login/?continue=${urlEncode}`;
//   }
// };

interface Auth2ProviderProps {
  children: ReactNode;
}

function Auth2Provider({ children }: Auth2ProviderProps) {
  const { message } = useCom2();
  const [authInfo, setAuthInfo] = useState<TAuthInfo>(initialState);
  const [loginUrl, setLoginUrl] = useState("");

  const pathname = usePathname();
  // const searchParams = useSearchParams().toString(); // Get query string if needed

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure code runs in client-side only
      const currentUrl = `${window.location.origin}${pathname}`;
      const urlEncode = encodeURIComponent(currentUrl);
      setLoginUrl(`${getAccountUrl()}/login/?continue=${urlEncode}`);
    }
  }, [pathname]);

  // When Com2 ready request for Auth Info
  useEffect(() => {
    if (message.data && message.data.head.path === "ready") {
      // Sending auth request
      sendToChild("auth/request", {}, "auth-request", "");
    }
  }, [message]);

  // If auth request granted, update the auth state
  useEffect(() => {
    if (message.data && message.data.head.path === "auth/request") {
      const { body } = message.data;
      setAuthInfo((d) => ({ ...d, ...body, loading: false }));
    }
  }, [message]);

  const value = useMemo(() => {
    const logOut = () => {
      // Sending logout message to child
      sendToChild("auth/logout", {}, "auth-logout", "");
    };

    const chkLoginReq = ({ error, referenceName }: TApiResponse<any>) => {
      if (error && referenceName === "login_required") {
        logOut();
      }
    };

    return { authInfo, logOut, loginUrl, chkLoginReq };
  }, [authInfo, loginUrl]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default Auth2Provider;
