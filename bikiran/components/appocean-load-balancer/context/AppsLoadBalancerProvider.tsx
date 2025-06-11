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
import { TStatus, TAppsLoadBalancerItem } from "../AppsLoadBalancerType";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  loadBalancerData: {
    appsBalancer: TAppsLoadBalancerItem[];
    status: TStatus[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const initialState = {
  appsBalancer: [],
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

const AppsLoadBalancerContext = createContext<TContext>({
  loadBalancerData: initialState,
  loading: false,
  reload: () => {},
});

export const useAppsLoadBalancer = () => {
  const context = useContext(AppsLoadBalancerContext);
  return context as TContext;
};

const AppsLoadBalancerProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [loadBalancerData, setLoadBalancerData] = useState<{
    appsBalancer: TAppsLoadBalancerItem[];
    status: TStatus[];
    pagination: TPagination;
  }>(initialState);

  const [reloadKey, setReloadKey] = useState<number>(-1);
  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/appocean/apps/balancer`, query)
        .then(({ data }) => {
          if (data) {
            setLoadBalancerData(data);
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
      loadBalancerData,
      reload,
      loading: reloadKey === -1,
    };
  }, [loadBalancerData, reloadKey]);
  return (
    <AppsLoadBalancerContext.Provider value={value}>
      {children}
    </AppsLoadBalancerContext.Provider>
  );
};

export default AppsLoadBalancerProvider;
