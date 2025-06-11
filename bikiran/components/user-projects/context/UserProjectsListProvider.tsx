/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
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
import ModalStatusChange from "../modal/ModalStatusChange";
import ModalAddProjectsUser from "../modal/ModalAddProjectsUser";
import { TUserProjectsItem } from "../userProjectsType";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  userProjectsData: {
    projects: TUserProjectsItem[];
    status?: string[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const UserProjectsListContext = createContext<TContext>({
  userProjectsData: {
    projects: [],
    pagination: {
      currentPage: 1,
      contentPerPage: 10,
      totalContent: 0,
      numberOfPages: 1,
      showingFrom: 0,
      showingTo: 0,
      pages: [],
    },
  },
  loading: false,
  reload: () => {},
});

export const useUserProjectsList = () => {
  const context = useContext(UserProjectsListContext);
  return context as TContext;
};

const UserProjectsListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [userProjectsData, setUserProjectsData] = useState<{
    projects: TUserProjectsItem[];
    status?: string[];
    pagination: TPagination;
  }>({ projects: [], pagination: {} as TPagination });

  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<{
        projects: TUserProjectsItem[];
        status: [];
        pagination: TPagination;
      }>(`/admin/user/project`, query)
        .then(({ data }) => {
          if (data) {
            setUserProjectsData(data);
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
      userProjectsData,
      reload,
      loading: reloadKey === -1,
    };
  }, [userProjectsData, reloadKey]);

  return (
    <UserProjectsListContext.Provider value={value}>
      {children}
      <ModalAddProjectsUser />
      <ModalStatusChange />
    </UserProjectsListContext.Provider>
  );
};

export default UserProjectsListProvider;
