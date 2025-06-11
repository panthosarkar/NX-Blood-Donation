import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  IAccountAdmContext,
  TAccountAdmData,
  TAccountFilters,
} from "../AccountAdmTypes";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

const AccountAdmContext = createContext<IAccountAdmContext | undefined>(
  undefined
);

export function useAccountAdmContext() {
  const context = useContext(AccountAdmContext);
  return context as IAccountAdmContext;
}

type IProps = {
  children: React.ReactNode;
  query: Record<string, any>;
};

export const AccountAdmProvider = ({ children, query }: IProps) => {
  // reload -2 = no reload, -1 = reload, 0 = default
  const [reload, setReload] = useState<number>(-1);
  const [data, setData] = useState<TAccountAdmData[] | null | undefined>(
    undefined
  );
  const [filters, setFilters] = useState<TAccountFilters>(
    {} as TAccountFilters
  );
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);

  const { get } = useApi();

  useEffect(() => {
    if (reload !== -2) {
      get<{
        accounts: TAccountAdmData[];
        filters: TAccountFilters;
        pagination: TPagination;
      }>(`/admin/billing/account/type-user`, query)
        .then(({ data }) => {
          if (data) {
            setData(data.accounts);
            setFilters(data.filters);
            setPagination(data.pagination);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReload(-2);
        });
    }
  }, [reload, query]);

  useEffect(() => {
    setReload(-1);
  }, [query]);
  const reFetch = () => {
    setReload(-1);
  };

  const value = useMemo(() => {
    return {
      data: data,
      pagination,
      setData: setData,
      reFetching: reload === -1,
      reFetch,
      filters,
    };
  }, [data, pagination, reload]);

  return (
    <AccountAdmContext.Provider value={value}>
      {children}
    </AccountAdmContext.Provider>
  );
};
