import {
  FC,
  useMemo,
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";
import { IAppList, IManageApplicationContext } from "../ManageApplicationTypes";
import ModalAddApplication from "../modals/ModalAddApplication";
import ModalUpdateApplication from "../modals/ModalUpdateApplication";
import useApi from "@/bik-lib/utils/useApi";

const ManageAppContext = createContext<IManageApplicationContext | undefined>(
  undefined
);

export function useManageApp() {
  const context = useContext(ManageAppContext);
  return context as IManageApplicationContext;
}

export const ManageApplicationProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [reload, setReload] = useState<number>(0);
  const [appList, setAppList] = useState<IAppList[] | null | undefined>(
    undefined
  );

  const { get } = useApi();

  useEffect(() => {
    if (reload !== -2) {
      get(`/admin/application`)
        .then(({ data }) => {
          setAppList(data);
        })
        .catch(() => {
          setAppList(null);
        })
        .finally(() => {
          setReload(-2);
        });
    }
  }, [reload]);

  const reFetch = () => {
    setReload(-1);
  };

  const value = useMemo(() => {
    return {
      appList,
      reFetching: reload === -1,
      reFetch,
    };
  }, [appList, reload]);

  return (
    <ManageAppContext.Provider value={value}>
      {children}
      {/* Modals */}
      <ModalAddApplication />
      <ModalUpdateApplication />{" "}
    </ManageAppContext.Provider>
  );
};
