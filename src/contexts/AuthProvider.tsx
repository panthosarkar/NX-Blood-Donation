"use client";

import { createContext, ReactNode, use, useEffect, useMemo, useState } from "react";
import { useTemplate } from "./template/TemplateProvider";
import { handleAxiosError } from "../utils/handleAxiosError";
import { ApiLoginConfirmOtp, ApiSendOtp } from "../shared/auth/AuthOperation";
import useApi from "../utils/useApi";
import { useInit } from "./InitProvider";
import { AuthContextType, IAuthInfo } from "./types/auth-type";
import Cookie from "../utils/Cookie";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => use(AuthContext) as AuthContextType;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { get } = useApi();
  const { authReloadKey, setAuthReloadKey, setTotalCartItems, totalCartItems } = useInit();
  const [authStateLoading, setAuthStateLoading] = useState(true);
  const [authInfo, setAuthInfo] = useState<IAuthInfo>({} as IAuthInfo);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    remember_me: false,
    password: "",
  });
  const [loading, setLoading] = useState(false);
  //function to show message
  const { setMessage, openModal } = useTemplate();
  //--send otp
  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await ApiSendOtp<AuthContextType["formData"]>(formData);
      setMessage("success", res.message);
      openModal("otp-verify-modal-open", res.data?.otp);
    } catch (ex) {
      setMessage("error", handleAxiosError(ex));
    } finally {
      setLoading(false);
    }
  };
  //--when otp is confirmed then reload the authInfo
  const confirmOtp = async () => {
    setLoading(true);
    try {
      const res = await ApiLoginConfirmOtp(formData);
      setMessage("success", res.message);
    } catch (ex) {
      setMessage("error", handleAxiosError(ex));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authReloadKey !== -2) {
      const fetchAuthInfo = async () => {
        setAuthStateLoading(true);
        try {
          const { data } = await get<IAuthInfo>("/auth/info");
          setAuthInfo(data as IAuthInfo);
          setIsAuthorized(true);
        } catch (ex) {
          setIsAuthorized(false);
         
          if (handleAxiosError(ex) !== "Profile Not Found") {
            setMessage("error", handleAxiosError(ex));
          }
        } finally {
          setAuthReloadKey(-2);
          setAuthStateLoading(false);
        }
      };
      fetchAuthInfo();
    }
  }, [authReloadKey]);

  //--fetch total cart items total
  useEffect(() => {
    if (totalCartItems.reload !== -2) {
      const fetchTotalCart = async () => {
        try {
          const { data } = await get<{ totalCart: number }>("/cart/total-product/count");
          setTotalCartItems({ reload: -2, total: data?.totalCart || 0 });
        } catch (ex) {
          setTotalCartItems({ reload: -2, total: 0 });
          setMessage("error", handleAxiosError(ex));
        }
      };

      fetchTotalCart();
    }
  }, [totalCartItems.reload]);

  const value = useMemo((): AuthContextType => {
    const handleFormChange = (e: any) => {
      const { name, value } = e.target;
      if (name) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    };

    const handleLogOut = () => {
      setAuthInfo({} as IAuthInfo);
      setAuthReloadKey(-1);
      setIsAuthorized(false);
      new Cookie("token").setCookie("", -1);
      router.refresh();
    };

    return {
      isAuthorized,
      sendOtp,
      authInfo,
      setAuthInfo,
      authStateLoading,
      setAuthStateLoading,
      formData,
      setFormData,
      confirmOtp,
      handleFormChange,
      handleLogOut,
    };
  }, [isAuthorized, authInfo, formData, authStateLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      {value.authStateLoading === true && null
      // {Loading: "Loading..."} // You can replace this with a proper loading component
      }
    </AuthContext.Provider>
  );
};
