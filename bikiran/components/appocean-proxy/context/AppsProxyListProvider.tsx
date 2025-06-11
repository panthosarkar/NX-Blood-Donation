"use client";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TStatus, TAppsProxyListItem } from "../AppsProxyListType";

import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  proxyData: {
    proxy: TAppsProxyListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const initialState = {
  proxy: [],
  status: [],
  pagination: {
    currentPage: 1,
    contentPerPage: 10,
    totalContent: 0,
    numberOfPages: 1,
    showingFrom: 0,
    showingTo: 0,
    pages: [],
  },
};

const AppsProxyListContext = createContext<TContext>({
  proxyData: initialState,
  loading: false,
  reload: () => {},
});

export const useAppsProxyList = () => {
  const context = useContext(AppsProxyListContext);
  return context as TContext;
};

const AppsProxyListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [proxyData, setProxyData] = useState<{
    proxy: TAppsProxyListItem[];
    status: TStatus[];
    pagination: TPagination;
  }>(initialState);

  const [reloadKey, setReloadKey] = useState<number>(-1);
  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/appOcean/apps/proxy`, query)
        .then(({ data }) => {
          if (data) {
            setProxyData(data);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey]);

  useEffect(() => {
    setReloadKey(-1);
  }, [query]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };
    return {
      proxyData,
      reload,
      loading: reloadKey === -1,
    };
  }, [proxyData, reloadKey]);
  return (
    <AppsProxyListContext.Provider value={value}>
      {children}
    </AppsProxyListContext.Provider>
  );
};

export default AppsProxyListProvider;
