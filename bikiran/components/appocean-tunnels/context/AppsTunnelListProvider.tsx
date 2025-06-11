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
import { TStatus, TAppsTunnelListItem } from "../AppsTunnelListType";

import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  appsTunnelData: {
    tunnel: TAppsTunnelListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const initialState = {
  tunnel: [],
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

const AppsTunnelListContext = createContext<TContext>({
  appsTunnelData: initialState,

  loading: false,
  reload: () => {},
});

export const useAppsTunnelList = () => {
  const context = useContext(AppsTunnelListContext);
  return context as TContext;
};

const AppsTunnelListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [appsTunnelData, setAppsTunnelData] = useState<{
    tunnel: TAppsTunnelListItem[];
    status: TStatus[];
    pagination: TPagination;
  }>(initialState);
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/appocean/apps/tunnels`, query)
        .then(({ data }) => {
          if (data) {
            setAppsTunnelData(data);
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
      appsTunnelData,
      reload,
      loading: reloadKey === -1,
    };
  }, [appsTunnelData, reloadKey]);
  return (
    <AppsTunnelListContext.Provider value={value}>
      {children}
    </AppsTunnelListContext.Provider>
  );
};

export default AppsTunnelListProvider;
