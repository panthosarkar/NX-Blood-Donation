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
import { TStatement } from "../statementTypes";
import useApi from "@/bik-lib/utils/useApi";

type TContext = {
  statement: TStatement;
  // linkPrint: string;
  reload: () => void;
  loading: boolean;
};

const StatementContext = createContext<TContext | undefined>(undefined);

export const useStatementInfo = () => {
  const context = useContext(StatementContext);
  return context as TContext;
};

type TProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const StatementProvider: FC<TProps> = ({ children, query }) => {
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [statement, setStatement] = useState<TStatement>({} as TStatement);

  const { get } = useApi();
  const { id } = useParams();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/billing/account/${id as string}/statement`, query)
        .then(({ data }) => {
          if (data) {
            setStatement(data);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
          setStatement({} as TStatement);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey, query]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };
    return {
      statement,
      // linkPrint: statement.linkPrint,
      reload,
      loading: reloadKey === -1,
    };
  }, [statement, reloadKey]);

  return (
    <StatementContext.Provider value={value}>
      {children}
    </StatementContext.Provider>
  );
};

export default StatementProvider;
