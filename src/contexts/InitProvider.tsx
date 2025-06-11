"use client";
import { createContext, use, useEffect, useMemo, useState } from "react";
import { useTemplate } from "./template/TemplateProvider";
import { AxiosAuth } from "../utils/AxiosAPI";
import { handleAxiosError } from "../utils/handleAxiosError";
import { TApiResponse } from "../types/response";
import { IInitInfo, InitContextType } from "./types/init-type";
import { AxiosErrorPage } from "../shared/ErrorPage/AxiosErrorPage";
import Cookie from "../utils/Cookie";
const InitContext = createContext<InitContextType>({} as InitContextType);

export const useInit = () => use(InitContext) as InitContextType;

export const InitProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalCartItems, setTotalCartItems] = useState({
    reload: -1,
    total: 0,
  });
  const [totalWishlistItems, setTotalWishlistItems] = useState({
    reload: -1,
    total: 0,
  });
  const [initInfo, setInitInfo] = useState<IInitInfo>({} as IInitInfo);
  const [authReloadKey, setAuthReloadKey] = useState(0);
  const [initLoading, setInitLoading] = useState(true);
  const [initReload, setInitReloadKey] = useState(-1);
  const { setMessage } = useTemplate();

  const setInit = (data: IInitInfo) => {
    setInitInfo(data);
  };

  useEffect(() => {
    if (initReload !== -2) {
      setInit({} as IInitInfo);
      setInitLoading(true);
      const fetchInit = async () => {
        try {
          const { data }: { data: TApiResponse<IInitInfo> } = await AxiosAuth.setPath("init/info").get();
          if (data.error !== 0) {
            throw new Error(data.message);
          }
          setAuthReloadKey(-1);
          setInit(data.data as IInitInfo);
          new Cookie("init-id").setCookie(data.data?.initId || "", 30);
          setInitLoading(false);
        } catch (ex) {
          setInitInfo((prev) => ({
            ...prev,
            error: true,
            message: "AxiosError",
          }));
          setMessage("error", handleAxiosError(ex));
        } finally {
          setInitReloadKey(-2);
        }
      };
      fetchInit();
    }
  }, [initReload]);

  const value = useMemo((): InitContextType => {
    return {
      initInfo,
      authReloadKey,
      setAuthReloadKey,
      setInitInfo,
      totalCartItems,
      setTotalCartItems,
      initLoading,
      totalWishlistItems,
      setTotalWishlistItems,
    };
  }, [totalCartItems, totalWishlistItems, initInfo, authReloadKey, initLoading]);

  if (initInfo?.error === true && initInfo.message === "AxiosError") {
    return <AxiosErrorPage onClick={() => setInitReloadKey(-1)} />;
  }

  if (initLoading) {
    return 
    {/* Loading... */}  
    ;
  }

  return <InitContext.Provider value={value}>{children}</InitContext.Provider>;
};
