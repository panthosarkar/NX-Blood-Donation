/* eslint-disable no-unused-vars */
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { TFilterOptionTr, TTransaction } from "../TransactionTypes";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TTransactionContextType = {
  transaction: TTransaction[];
  pagination: TPagination;
  filterOption: TFilterOptionTr;
  refetchTransactionData: () => void;
  reFetching: boolean;
};

// Create the context with default value
const TransactionContext = createContext<TTransactionContextType>({
  transaction: [],
  pagination: {} as TPagination,
  filterOption: {} as TFilterOptionTr,
  refetchTransactionData: () => {},
  reFetching: false,
});

// Create the custom hook to use the context
export function useTransaction() {
  const context = useContext(TransactionContext);
  return context as TTransactionContextType;
}

// Define the component props for AppProvider
type Props = {
  children: ReactNode;
  query: Record<string, any>;
};

const TransactionProvider: React.FC<Props> = ({ children, query }) => {
  const [transaction, setTransaction] = useState<TTransaction[]>([]);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);
  const [filterOption, setFilterOption] = useState<TFilterOptionTr>(
    {} as TFilterOptionTr
  );
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  // const { closeModal, modalType } = useTemplate();
  // Load device data
  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/billing/transactions`, query)
        .then(({ data }) => {
          setTransaction(data.transactions);
          setPagination(data.pagination);
          setFilterOption(data.filterOption);
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

  // //Create Domain Package
  // const createDomainPackage = (payload: TDomainPackagePayload) => {
  //   setFetching(true);
  //   setMessage("Creating project...");
  //   ApiCreateDomainPackage(authInfo, payload)
  //     .then(({ message }) => {
  //       setMessage(message);
  //       closeModal();
  //     })
  //     .catch((err) => {
  //       setMessage(err);
  //     })
  //     .finally(() => {
  //       setFetching(false);
  //     });
  // };

  // Memoized value to avoid unnecessary re-renders
  const refetchTransactionData = () => {
    setReloadKey(-1);
  };
  const value = useMemo(() => {
    return {
      transaction,
      refetchTransactionData,
      pagination,
      reFetching: reloadKey === -1,
      filterOption,
    };
  }, [reloadKey, transaction, pagination]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
      {/* <ModalCreateDomain closeModal={closeModal} reFetching={reFetching} show={modalType === "create-domain-package"} createDomainPackage={createDomainPackage} /> */}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
