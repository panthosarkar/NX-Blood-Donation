"use client";
import {
  FC,
  useMemo,
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext,
} from "react";
import { TUserProp, TUserPropResponse } from "../UserPropType";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";
import ModalUpdateProjectLimit from "../modal/ModalUpdateProjectLimit";

type TContext = {
  userProperties: TUserProp[];
  status: string[];
  pagination: TPagination;
  loading: boolean;
  reload: () => void;
};

const UserPropertiesContext = createContext<TContext>({} as TContext);

export const useUserProp = () => {
  const context = useContext(UserPropertiesContext);
  return context as TContext;
};

type TProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const UserPropertiesProvider: FC<TProps> = ({ children, query }) => {
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [pageData, setPageData] = useState<{
    users: TUserProp[];
    status: string[];
    pagination: TPagination;
  }>(
    {} as {
      users: TUserProp[];
      status: string[];
      pagination: TPagination;
    }
  );

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<TUserPropResponse>(`/admin/user/prop`, query)
        .then(({ data }) => {
          if (data) {
            setPageData(data);
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
      userProperties: pageData?.users,
      status: pageData?.status,
      pagination: pageData?.pagination,
      loading: reloadKey === -1,
      reload,
    };
  }, [pageData, reloadKey]);

  return (
    <UserPropertiesContext.Provider value={value}>
      {children}

      {/* modals  */}
      <ModalUpdateProjectLimit />
    </UserPropertiesContext.Provider>
  );
};

export default UserPropertiesProvider;
