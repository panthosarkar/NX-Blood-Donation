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
import { TUserAddressItem } from "../userAddressType";
import ModalAddAddressUser from "../modal/ModalAddAddressUser";
import ModalUpdateAddress from "../modal/ModalUpdateAddress";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  status: string[];
  pagination: TPagination;
  userAddressData: TUserAddressItem[];
  loading: boolean;
  reload: () => void;
};

const UserAddressListContext = createContext<TContext>({
  status: [],
  pagination: {
    totalContent: 0,
    contentPerPage: 0,
    currentPage: 1,
    numberOfPages: 0,
    pages: [],
    showingFrom: 0,
    showingTo: 0,
  },
  userAddressData: [],
  loading: false,
  reload: () => {},
});

export const useUserAddressList = () => {
  const context = useContext(UserAddressListContext);
  return context as TContext;
};

const UserAddressListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [status, setStatus] = useState<string[]>([]);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);
  const [userAddressData, setUserAddressData] = useState<TUserAddressItem[]>(
    []
  );
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<{
        addresses: TUserAddressItem[];
        status: string[];
        pagination: TPagination;
      }>(`/admin/user/address`, query)
        .then(({ data }) => {
          if (data) {
            setUserAddressData(data?.addresses);
            setStatus(data?.status);
            setPagination(data?.pagination);
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
      userAddressData,
      status,
      reload,
      loading: reloadKey === -1,
      pagination,
    };
  }, [userAddressData, reloadKey]);

  return (
    <UserAddressListContext.Provider value={value}>
      {children}
      <ModalAddAddressUser />
      <ModalUpdateAddress />
    </UserAddressListContext.Provider>
  );
};

export default UserAddressListProvider;
