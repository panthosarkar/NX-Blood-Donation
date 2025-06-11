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
import { TUserActivityLogs } from "../UserActivityTypes";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TUserActivity = {
  data: TUserActivityLogs[];
  setData: TState<TUserActivityLogs[]>;
  pagination: TPagination;
  setPagination: TState<TPagination>;
  loading: boolean;
  reload: () => void;
};

const UserActivityContext = createContext<TUserActivity>({
  data: [],
  setData: () => {},
  pagination: {} as TPagination,
  setPagination: () => {},
  loading: false,
  reload: () => {},
});

export const useActivityUser = () => {
  const context = useContext(UserActivityContext);
  return context;
};

type TProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const UserActivityProvider: FC<TProps> = ({ children, query }) => {
  // reload -2 = no reload, -1 = reload, -1 = default
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<TUserActivityLogs[]>([]);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);
  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/logs/activity/users`, query)
        .then(({ data }) => {
          setData(data.activities);
          setPagination(data.pagination);
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
      reload,
      data: data,
      setData: setData,
      pagination: pagination,
      setPagination: setPagination,
      loading: reloadKey === -1,
    };
  }, [data, pagination, reloadKey]);

  return (
    <UserActivityContext.Provider value={value}>
      {children}
    </UserActivityContext.Provider>
  );
};

export default UserActivityProvider;
