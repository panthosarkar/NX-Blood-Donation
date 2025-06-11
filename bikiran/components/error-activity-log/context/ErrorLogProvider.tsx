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
import { TErrorLogs } from "../ErrorLogTypes";
import useApi from "@/bik-lib/utils/useApi";

type TErrorLogContext = {
  data: TErrorLogs[];
  setData: TState<TErrorLogs[]>;
  loading: boolean;
  reload: () => void;
};

const ErrorLogContext = createContext<TErrorLogContext>({
  data: [],
  setData: () => {},
  loading: false,
  reload: () => {},
});

export const useErrorLogs = () => {
  const context = useContext(ErrorLogContext);
  return context;
};

type TProps = {
  children: ReactNode;
};

const ErrorLogProvider: FC<TProps> = ({ children }) => {
  // reload -2 = no reload, -1 = reload, -1 = default
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<TErrorLogs[]>([]);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/logs/activity/error`)
        .then(({ data }) => {
          setData(data.activities);
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };

    return {
      reload,
      data: data,
      setData: setData,
      loading: reloadKey === -1,
    };
  }, [data, reloadKey]);

  return (
    <ErrorLogContext.Provider value={value}>
      {children}
    </ErrorLogContext.Provider>
  );
};

export default ErrorLogProvider;
