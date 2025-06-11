"use client";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "next/navigation";
import useApi from "@/bik-lib/utils/useApi";
import { TInvoiceResponse } from "../invoiceManageTypes";

type TContext = {
  invoiceInfo: TInvoiceResponse;
  reload: (num?: number) => void;
  loading: boolean;
};

const InvoiceManageContext = createContext<TContext | undefined>(undefined);

export const useInvoiceInfo = () => {
  const context = useContext(InvoiceManageContext);
  return context as TContext;
};

type TProps = {
  children: ReactNode;
};

const InvoiceManageProvider: FC<TProps> = ({ children }) => {
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [invoiceInfo, setInvoiceInfo] = useState<TInvoiceResponse>(
    {} as TInvoiceResponse
  );

  const { id } = useParams();

  const invoiceId = id?.toString() || "";

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/invoice/${invoiceId}/detail`)
        .then(({ data }) => {
          if (data) {
            setInvoiceInfo(data);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
          setInvoiceInfo({ ...({} as TInvoiceResponse), notFound: true });
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey, invoiceId]);

  const value = useMemo(() => {
    const reload = (num?: number) => {
      setReloadKey(typeof num === "number" ? num : -1);
    };
    return {
      invoiceInfo,
      reload,
      loading: reloadKey === -1,
    };
  }, [invoiceInfo, reloadKey]);

  return (
    <InvoiceManageContext.Provider value={value}>
      {children}
    </InvoiceManageContext.Provider>
  );
};

export default InvoiceManageProvider;
