// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TState } from "@/bik-lib/types/event";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TCPanel, TFilter } from "../CPanalType";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TCPanelContext = {
  data: {
    hostings: TCPanel[];
    filters: TFilter;
    pagination: TPagination;
  };
  setData: TState<any>;
  loading: boolean;
  reload: () => void;
};

const defaultState: TCPanelContext = {
  data: {
    hostings: [],
    filters: {} as TFilter,
    pagination: {} as TPagination,
  },
  setData: () => {},
  loading: false,
  reload: () => {},
};

const CPanelContext = createContext<TCPanelContext>(defaultState);

export const useCPanel = () => {
  const context = useContext(CPanelContext);
  return context;
};

type TProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const CPanelProvider: FC<TProps> = ({ children, query }) => {
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<{
    hostings: TCPanel[];
    filters: TFilter;
    pagination: TPagination;
  }>({ hostings: [], filters: {} as TFilter, pagination: {} as TPagination });

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/hosting/cp-manage`, query)
        .then(({ data }) => {
          if (data) {
            setData(data);
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
      data,
      setData,
      reload,
      loading: reloadKey === -1,
    };
  }, [data, reloadKey]);

  return (
    <CPanelContext.Provider value={value}>{children}</CPanelContext.Provider>
  );
};

export default CPanelProvider;
