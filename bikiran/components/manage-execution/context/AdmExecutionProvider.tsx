/* eslint-disable no-unused-vars */
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
import { TExecutionData } from "../admExecutionType";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  admExecuteData: TExecutionData[] | null | undefined;
  reFetching: boolean;
  reFetch: () => void;
};
const InvoiceExecutionContext = createContext<TContext | undefined>(undefined);

export function useAdmExecution() {
  const context = useContext(InvoiceExecutionContext);
  return context as TContext;
}

type TProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const AdmExecutionProvider: FC<TProps> = ({ children, query }) => {
  const [admExecuteData, setAdmExecuteData] = useState<
    TExecutionData[] | null | undefined
  >(undefined);
  const [reload, setReload] = useState(-1);

  const { get } = useApi();

  // --Load Domain Info
  useEffect(() => {
    if (reload !== -2) {
      // Fetch API
      get<TExecutionData[]>(`/admin/execution`, query)
        .then(({ data }) => {
          // On Success update data
          setAdmExecuteData(data);
        })
        .catch(() => {
          setAdmExecuteData(null);
        })
        .finally(() => {
          // On Fetching done set reload to -2
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
      admExecuteData,
      reFetching: reload === -1,
      reFetch,
    };
  }, [reload, admExecuteData]);

  return (
    <InvoiceExecutionContext.Provider value={value}>
      {children}
    </InvoiceExecutionContext.Provider>
  );
};

export default AdmExecutionProvider;
