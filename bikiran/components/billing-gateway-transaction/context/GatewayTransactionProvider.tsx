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
import { TGatewayTransactionType } from "../GatewayTransactionType";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type TGatewayTransactionContextType = {
  gatewayTransaction: TGatewayTransactionType[];
  pagination: TPagination;
  refetchGatewayTransactionData: () => void;
  reFetching: boolean;
};

// Create the context with default value
const GatewayTransactionContext = createContext<TGatewayTransactionContextType>(
  {
    gatewayTransaction: [],
    refetchGatewayTransactionData: () => {},
    pagination: {} as TPagination,
    reFetching: false,
  }
);

// Custom hook to use GatewayTransactionContext
export function useGatewayTransaction() {
  const context = useContext(GatewayTransactionContext);
  return context as TGatewayTransactionContextType;
}

// Define the component props for AppProvider
type IProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const GatewayTransactionProvider: React.FC<IProps> = ({ children, query }) => {
  const [gatewayTransaction, setGatewayTransaction] = useState<
    TGatewayTransactionType[]
  >([]);
  const [reload, setReload] = useState<number>(0);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);

  const { get } = useApi();

  useEffect(() => {
    if (reload !== -2) {
      get(`/admin/billing/gateway-transactions`, query)
        .then(({ data }) => {
          setGatewayTransaction(data.gatewayTransactions);
          setPagination(data.pagination);
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

  const refetchGatewayTransactionData = () => {
    setReload(-1);
  };
  // Memoized value to avoid unnecessary re-renders
  const value = useMemo(() => {
    return {
      gatewayTransaction,
      pagination,
      refetchGatewayTransactionData,
      reFetching: reload === -1,
    };
  }, [reload, gatewayTransaction, pagination]);

  return (
    <GatewayTransactionContext.Provider value={value}>
      {children}
      {/* <ModalCreateDomain closeModal={closeModal} reFetching={reFetching} show={modalType === "create-domain-package"} createDomainPackage={createDomainPackage} /> */}
    </GatewayTransactionContext.Provider>
  );
};

export default GatewayTransactionProvider;
