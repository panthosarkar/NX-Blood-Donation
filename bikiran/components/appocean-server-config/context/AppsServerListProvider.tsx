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
import { TStatus, TAppsServerListItem } from "../AppsServerListType";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  appsServerListData: {
    server: TAppsServerListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const initialState = {
  server: [],
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

const AppsServerListContext = createContext<TContext>({
  appsServerListData: initialState,

  loading: false,
  reload: () => {},
});

export const useAppsServerList = () => {
  const context = useContext(AppsServerListContext);
  return context as TContext;
};

const AppsServerListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [appsServerListData, setAppsServerData] = useState<{
    server: TAppsServerListItem[];
    status: TStatus[];
    pagination: TPagination;
  }>(initialState);

  const [reloadKey, setReloadKey] = useState<number>(-1);
  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/appOcean/apps/server-config`, query)
        .then(({ data }) => {
          if (data) {
            setAppsServerData(data);
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
      appsServerListData,
      reload,
      loading: reloadKey === -1,
    };
  }, [appsServerListData, reloadKey]);
  return (
    <AppsServerListContext.Provider value={value}>
      {children}
    </AppsServerListContext.Provider>
  );
};

export default AppsServerListProvider;
