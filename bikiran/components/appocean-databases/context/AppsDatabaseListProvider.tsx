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
import { TStatus, TAppsDatabaseListItem } from "../AppsDatabaseListType";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  appsDatabaseList: {
    database: TAppsDatabaseListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const initialState = {
  database: [],
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

const AppsDatabaseListContext = createContext<TContext>({
  appsDatabaseList: initialState,
  loading: false,
  reload: () => {},
});

export const useAppsDatabaseList = () => {
  const context = useContext(AppsDatabaseListContext);
  return context as TContext;
};

type TDatabase = {
  database: TAppsDatabaseListItem[];
  status: TStatus[];
  pagination: TPagination;
};

const AppsDatabaseListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [appsDatabaseList, setAppsDatabaseList] =
    useState<TDatabase>(initialState);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/appOcean/apps/database`, query)
        .then(({ data }) => {
          if (data) {
            setAppsDatabaseList(data);
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
      appsDatabaseList,
      reload,
      loading: reloadKey === -1,
    };
  }, [appsDatabaseList, reloadKey]);
  return (
    <AppsDatabaseListContext.Provider value={value}>
      {children}
    </AppsDatabaseListContext.Provider>
  );
};

export default AppsDatabaseListProvider;
