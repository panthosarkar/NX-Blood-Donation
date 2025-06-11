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
import {
  TBankAccount,
  TBankCurrency,
  TBankResponse,
} from "../bankManagementTypes";
import ModalAddBankAccount from "../modals/ModalAddBankAccount";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  pageData: TBankResponse;
  accounts: TBankAccount[];
  currencies: TBankCurrency[];
  loading: boolean;
  reload: () => void;
};

const BankManagementContext = createContext<TContext | undefined>(undefined);

export const useBankManagement = () => {
  const context = useContext(BankManagementContext);
  return context as TContext;
};

const BankManagementProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [pageData, setPageData] = useState<TBankResponse>({} as TBankResponse);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<TBankResponse>(`/admin/config/bank-account`, query)
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
  }, [reloadKey, query]);
  useEffect(() => {
    setReloadKey(-1);
  }, [query]);
  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };
    return {
      pageData,
      accounts: pageData.accounts,
      currencies: pageData.currencies,
      reload,
      loading: reloadKey === -1,
    };
  }, [pageData, reloadKey]);

  return (
    <BankManagementContext.Provider value={value}>
      {children}

      {/* Modals */}
      <ModalAddBankAccount />
    </BankManagementContext.Provider>
  );
};

export default BankManagementProvider;
