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
import { TUserListItem } from "../userListType";
import ModalCreateUser from "../modals/ModalCreateUser";
import ModalUpdateUser from "../modals/ModalUpdateUser";
import { TPagination } from "@/bik-lib/types/response";
import ModalImportResellbiz from "../modals/ModalImportResellbiz";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  userListData: {
    users: TUserListItem[];
    status: string[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const initialState = {
  users: [],
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

const UserListContext = createContext<TContext>({
  userListData: initialState,

  loading: false,
  reload: () => {},
});

export const useUserList = () => {
  const context = useContext(UserListContext);
  return context as TContext;
};

type TUserData = {
  users: TUserListItem[];
  status: string[];
  pagination: TPagination;
};

const UserListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [userListData, setUserListData] = useState<TUserData>(initialState);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  const { setMessage } = useTemplate();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<{
        users: TUserListItem[];
        status: string[];
        pagination: TPagination;
      }>(`/admin/user`, query)
        .then(({ data }) => {
          if (data) {
            setUserListData(data);
          }
        })
        .catch((err: Error) => {
          setMessage(err.message);
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
      userListData,
      reload: () => reload(),
      loading: reloadKey === -1,
    };
  }, [userListData, reloadKey]);

  return (
    <UserListContext.Provider value={value}>
      {children}
      <ModalCreateUser />
      <ModalUpdateUser />
      <ModalImportResellbiz />
    </UserListContext.Provider>
  );
};

export default UserListProvider;
