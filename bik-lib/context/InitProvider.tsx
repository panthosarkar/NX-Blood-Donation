"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { getApi2Url, getBaseDomain } from "../utils/Env";
import AxiosAuth from "../utils/AxiosAPI";
import Cookie from "../utils/Cookie";
import { md5 } from "../utils/hash";

/* 
NOTE:
    * To get locale from cookie
      const locale = new Cookie("locale").getCookie();

    * To get init-id from cookie
      const initId = new Cookie("init-id").getCookie();

    * To get currencies from localstorage
      const currencies = JSON.parse(localStorage.getItem("currencies"));

    * To get isDurationYearly from localstorage
      const isDurationYearly = JSON.parse(localStorage.getItem("isDurationYearly"));
*/

interface InitData {
  locale?: Record<string, unknown>;
  initId?: string;
  initHash?: string;
  currencies?: unknown[];
}

interface InitContextType {
  // Define any context values you want to expose here
}

const InitContext = createContext<InitContextType | undefined>(undefined);

export function useInit() {
  const context = useContext(InitContext);
  if (!context) {
    throw new Error("useInit must be used within an InitProvider");
  }
  return context;
}

const localStorage = typeof window !== "undefined" ? window.localStorage : null;

interface InitProviderProps {
  children: ReactNode;
}

function InitProvider({ children }: InitProviderProps) {
  const [initData, setInitData] = useState<InitData | null>(null);

  // Get locale from initData
  const locale = useMemo(() => initData?.locale || {}, [initData]);

  // Create Cookie instance
  const cookie = useMemo(() => new Cookie("locale"), []);

  // const initId = new Cookie("init-id", getBaseDomain()).getCookie() || "";

  // Check if locale is changed. If changed, reload the page
  useEffect(() => {
    const handleChangeVisibility = () => {
      if (document.visibilityState === "visible") {
        const cookieLocale = cookie.getCookie();
        if (md5(JSON.stringify(locale)) !== md5(cookieLocale)) {
          if (Object.keys(locale).length > 0) {
            window.location.reload();
          }
        }
      }
    };
    document.addEventListener("visibilitychange", handleChangeVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleChangeVisibility);
    };
  }, [cookie, locale]);

  // Get initData from API
  useEffect(() => {
    AxiosAuth.setUrl(`${getApi2Url()}/init`)
      .get({})
      .then(({ data }) => {
        if (!data.error) {
          // Init Info
          setInitData(data.data);

          new Cookie("init-id", getBaseDomain()).setCookie(
            data.data.initId,
            365
          );
          // setCookie("initHash", data.data.initHash, 365);
          new Cookie("locale", getBaseDomain()).setCookie(
            JSON.stringify(data?.data?.locale),
            365
          );

          // set data?.data?.currencies in localstorage
          localStorage?.setItem(
            "currencies",
            JSON.stringify(data?.data?.currencies)
          );
        }
      });
  }, [locale.currency]);

  // if (initId?.length === 0) {
  //   return (
  //     <div className="bg-[#292929d4] w-full h-screen relative">
  //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-white rounded-20 w-[20%] h-[40%]">
  //         <span className="text-xl text-primary">
  //           <span className="text-secondary">Init ID</span> is missing
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }

  // if (initId?.length === 0) {
  //   return (
  //     <div>
  //       <PageLoading />
  //       <div className="floating-message flex flex-nowrap">
  //         <span className="flex-auto self-center leading-5">
  //           Init ID is missing
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }
  return <InitContext.Provider value={{}}>{children}</InitContext.Provider>;
}

export default InitProvider;
