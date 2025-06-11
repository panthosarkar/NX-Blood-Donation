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

import useApi from "@/bik-lib/utils/useApi";
import { TServer } from "../ServerConfig";
import ModalAssignHosting from "../modals/ModalAssignHosting";

type TContext = {
  pageData: TServer[];
  loading: boolean;
  reload: () => void;
};

const ServerConfigContext = createContext<TContext | undefined>(undefined);

export function useUnlocatedHosting() {
  const context = useContext(ServerConfigContext);
  return context as TContext;
}

type Props = {
  children: ReactNode;
  query: Record<string, any>;
};
const ServerConfigProvider: React.FC<Props> = ({ children, query }) => {
  const [pageData, setPageData] = useState<TServer[]>([]);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();
  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/hosting/cp-server-conf`, query)
        .then(({ data }) => {
          setPageData(data.servers);
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
      pageData,
      reload,
      loading: reloadKey === -1,
    };
  }, [pageData, reloadKey]);

  return (
    <ServerConfigContext.Provider value={value}>
      {children}

      {/* Modals */}
      <ModalAssignHosting />
    </ServerConfigContext.Provider>
  );
};

export default ServerConfigProvider;
