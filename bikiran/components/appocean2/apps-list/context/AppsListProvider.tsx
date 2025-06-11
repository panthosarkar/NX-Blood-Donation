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
import { TStatus, TAppsListItem } from "../AppsListType";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  appsListData: {
    apps: TAppsListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const initialState = {
  apps: [],
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

const AppsListContext = createContext<TContext>({
  appsListData: initialState,

  loading: false,
  reload: () => {},
});

export const useAppsList = () => {
  const context = useContext(AppsListContext);
  return context as TContext;
};

const AppsListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [appsListData, setAppsListData] = useState<{
    apps: TAppsListItem[];
    status: TStatus[];
    pagination: TPagination;
  }>(initialState);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/appOcean/apps`, query)
        .then(({ data }) => {
          if (data) {
            setAppsListData(data);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey, query]);

  useEffect(() => {
    setReloadKey(-1);
  }, [query]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };
    return {
      appsListData,

      reload,
      loading: reloadKey === -1,
    };
  }, [appsListData, reloadKey]);
  return (
    <AppsListContext.Provider value={value}>
      {children}
      {/* Modals */}
    </AppsListContext.Provider>
  );
};

export default AppsListProvider;
