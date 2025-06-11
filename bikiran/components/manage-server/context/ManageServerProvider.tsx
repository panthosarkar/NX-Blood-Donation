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
import { TEnvUpdate, TServerData } from "../ManageServerType";
import ModalCreateServer from "../modals/ModalCreateServer";
import ModalUpdateServer from "../modals/ModalUpdateServer";
import ModalServerEnvUpdate from "../modals/ModalServerEnvUpdate";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  serverType: string[];
  serverData: TServerData[];
  serverEnv: TEnvUpdate[];
  serverStatus: string[];

  loading: boolean;
  reload: () => void;
};

const ServerListContext = createContext<TContext>({
  serverType: [],
  serverData: [],
  serverEnv: [],
  serverStatus: [],
  loading: false,
  reload: () => {},
});

export const useServerInfo = () => {
  const context = useContext(ServerListContext);
  return context as TContext;
};

const ManageServerProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [serverData, setServerData] = useState<TServerData[]>([]);
  const [serverType, setServerType] = useState<string[]>([]);
  const [serverEnv, setServerEnv] = useState<TEnvUpdate[]>([]);
  const [serverStatus, setServerStatus] = useState<string[]>([]);
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<{
        servers: TServerData[];
        serverTypes: string[];
        environments: TEnvUpdate[];
        serverStatus: string[];
      }>(`/admin/server`, query)
        .then(({ data }) => {
          if (data) {
            setServerData(data.servers);
            setServerType(data.serverTypes);
            setServerEnv(data.environments);
            setServerStatus(data.serverStatus);
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
      serverType,
      serverData,
      serverEnv,
      serverStatus,
      reload,
      loading: reloadKey === -1,
    };
  }, [reloadKey]);
  return (
    <ServerListContext.Provider value={value}>
      {children}
      <ModalCreateServer />
      <ModalUpdateServer />
      <ModalServerEnvUpdate />
    </ServerListContext.Provider>
  );
};

export default ManageServerProvider;
