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
import { TPagination } from "@/bik-lib/types/response";
import { TCurrency, TDomainListItem } from "../domainListTypes";
import useApi from "@/bik-lib/utils/useApi";
import ModalDomainAdd from "../modals/ModalDomainAdd";
import ModalUpdateCurrency from "../modals/ModalUpdateCurrency";
import ModalUpdateDomainDates from "../modals/ModalUpdateDomainDates";
import ModalUpdateDomainTitle from "../modals/ModalUpdateDomainTitle";
import ModalUpdateDomainPricing from "../modals/ModalUpdateDomainPricing";
import ModalChangeDomainOwnerShip from "../modals/ModalChangeDomainOwnership";

type TContext = {
  status: string[];
  currencies: TCurrency[];
  domainListData: TDomainListItem[];
  pagination: TPagination;
  loading: boolean;
  reload: () => void;
};

const DomainListContext = createContext<TContext>({
  status: [],
  currencies: [],
  domainListData: [],
  loading: false,
  pagination: {
    currentPage: 1,
    contentPerPage: 10,
    totalContent: 0,
    numberOfPages: 1,
    showingFrom: 0,
    showingTo: 0,
    pages: [],
  },
  reload: () => {},
});

export const useDomainList = () => {
  const context = useContext(DomainListContext);
  return context as TContext;
};

const DomainListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [domainListData, setDomainListData] = useState<TDomainListItem[]>([]);
  const [currencies, setCurrencies] = useState<TCurrency[]>([]);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);
  const [status, setStatus] = useState<string[]>([]);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<{
        currencies: TCurrency[];
        domains: TDomainListItem[];
        pagination: TPagination;
        status: string[];
      }>(`/admin/domain/manage`, query)
        .then(({ data }) => {
          if (
            data?.domains &&
            data?.currencies &&
            data?.status &&
            data?.pagination
          ) {
            setDomainListData(data.domains);
            setCurrencies(data.currencies);
            setStatus(data.status);
            setPagination(data.pagination);
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
      status,
      currencies,
      domainListData,
      pagination,
      reload,
      loading: reloadKey === -1,
    };
  }, [domainListData, reloadKey]);

  return (
    <DomainListContext.Provider value={value}>
      {children}

      {/* Modals */}
      <ModalDomainAdd />
      <ModalUpdateDomainTitle />
      <ModalUpdateDomainPricing />
      <ModalChangeDomainOwnerShip />
      <ModalUpdateCurrency />
      <ModalUpdateDomainDates />
    </DomainListContext.Provider>
  );
};

export default DomainListProvider;
