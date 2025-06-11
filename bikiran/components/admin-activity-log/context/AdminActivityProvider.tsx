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
import { TAdminActivityLogs } from "../AdminActivityTypes";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TAdminActivity = {
  data: TAdminActivityLogs[];
  setData: TState<TAdminActivityLogs[]>;
  pagination: TPagination;
  loading: boolean;
  reload: () => void;
};

const AdminActivityContext = createContext<TAdminActivity>({
  data: [],
  setData: () => {},
  pagination: {} as TPagination,
  loading: false,
  reload: () => {},
});

export const useActivityAdmin = () => {
  const context = useContext(AdminActivityContext);
  return context;
};

type TProps = {
  children: ReactNode;
};

const AdminActivityProvider: FC<TProps> = ({ children }) => {
  // reload -2 = no reload, -1 = reload, -1 = default
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<TAdminActivityLogs[]>([]);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/logs/activity/admins`)
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
  }, [reloadKey]);

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
  }, [data, reloadKey, pagination]);

  return (
    <AdminActivityContext.Provider value={value}>
      {children}
    </AdminActivityContext.Provider>
  );
};

export default AdminActivityProvider;
