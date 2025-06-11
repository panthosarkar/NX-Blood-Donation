/* eslint-disable no-unused-vars */
"use client";
import React, {
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

// Define the context types
interface Locale {
  country: string;
  currency: string;
  language: string;
}

interface AppContextType {
  locale: Locale | null;
  currency: string | null;
  isYearly: boolean;
  currencies: [] | null;
  applicationData: any[]; // Adjust the type based on your actual data structure
  handelChangeIsYearly: (yState: boolean) => void;
  handelChangeLocale: (currency: string) => void;
}

// Initial default context value
const defaultContextValue: AppContextType = {
  locale: null,
  currency: null,
  isYearly: false,
  currencies: null,
  applicationData: [],
  handelChangeIsYearly: () => {},
  handelChangeLocale: () => {},
};

// Create the context with default value
const AppContext = createContext<AppContextType>(defaultContextValue);

// Custom hook to use AppContext
export function useApp() {
  const context = useContext(AppContext);

  return context as AppContextType;
}

// Define the component props for AppProvider
interface AppProviderProps {
  children: ReactNode;
}

export const getInitId = () =>
  new Cookie("init-id", getBaseDomain()).getCookie() || "";

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [applicationData, setApplicationData] = useState<any[]>([]);

  const [locale, setLocale] = useState<Locale>({
    country: "",
    currency: "",
    language: "",
  });
  const [currencies, setCurrencies] = useState<[] | null>(null);

  const [isYearly, setIsYearly] = useState<boolean>(
    typeof window !== "undefined"
      ? localStorage?.getItem("isDurationYearly") === "true"
      : false
  );

  // Fetch currencies from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageCurrencies = localStorage.getItem("currencies");
      if (localStorageCurrencies) {
        setCurrencies(JSON.parse(localStorageCurrencies));
      }
    }
  }, []);

  // get locale from cookie and set it to state
  useEffect(() => {
    const cookieLocale = new Cookie("locale", getBaseDomain()).getCookie();
    const locale = cookieLocale
      ? JSON.parse(cookieLocale)
      : { country: "", currency: "", language: "" };
    setLocale(locale);
  }, []);

  // Fetch application data
  useEffect(() => {
    AxiosAuth.setUrl(`${getApi2Url()}/api/data`)
      .get()
      .then(({ data }) => {
        if (!data?.error) {
          setApplicationData(data?.data || []);
        }
      })
      .catch((ex: Error) => {
        setApplicationData([]);
      });
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoized value to avoid unnecessary re-renders
  const value = useMemo(() => {
    const handelChangeLocale = (currency?: string) => {
      const country = locale?.country || "";
      const currency2 = currency || locale?.currency;
      const language = locale?.language || "";

      const newLocale = JSON.stringify({
        country,
        currency: currency2 || "",
        language,
      });
      new Cookie("locale", getBaseDomain()).setCookie(newLocale, 365);
      setLocale({
        country,
        currency: currency2 || "",
        language,
      });
    };

    const handelChangeIsYearly = (yState: boolean) => {
      localStorage.setItem("isDurationYearly", yState.toString());
      setIsYearly(localStorage.getItem("isDurationYearly") === "true");
    };

    return {
      locale,
      currency: locale?.currency || null,
      isYearly,
      currencies,
      applicationData,
      handelChangeIsYearly,
      handelChangeLocale,
    };
  }, [applicationData, currencies, isYearly, locale]);

  if (!isClient) return null;
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
