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
  TCpServers,
  TCurrency,
  THostingListData,
  THostingListItem,
  TPackage,
} from "../hostingListType";
import ModalAddHosting from "../modal/ModalAddHosting";
import ModalUpdateBasic from "../modal/ModalUpdateBasic";
import ModalUpdateOwnership from "../modal/ModalUpdateOwnership";
import ModalUpdatePricing from "../modal/ModalUpdatePricing";
import ModalUpdatePackage from "../modal/ModalUpdatePackage";
import { TPagination } from "@/bik-lib/types/response";
import ModalUpdateCurrency from "../modal/ModalUpdateCurrency";
import ModalUpdateDuration from "../modal/ModalUpdateDuration";
import ModalUpdateHostingDates from "../modal/ModalUpdateHostingDates";
import useApi from "@/bik-lib/utils/useApi";
import ModalCPLimit from "../modal/ModalCPLimit";

type TContext = {
  currencies: TCurrency[];
  packageData: TPackage[];
  pagination: TPagination;
  hostingListData: THostingListItem[];
  cpServers: TCpServers[];
  status: string[];
  loading: boolean;
  reload: () => void;
};

const HostingListContext = createContext<TContext>({
  currencies: [],
  hostingListData: [],
  pagination: {} as TPagination,
  packageData: [],
  cpServers: [],
  status: [],
  loading: false,
  reload: () => {},
});

export const useHostingList = () => {
  const context = useContext(HostingListContext);
  return context as TContext;
};

const HostingListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [hostingListData, setHostingListData] = useState<THostingListItem[]>(
    []
  );
  const [currencies, setCurrencies] = useState<TCurrency[]>([]);
  const [cpServers, setCpServers] = useState<TCpServers[]>([]);
  const [packageData, setPackageData] = useState<TPackage[]>([]);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);
  const [status, setStatus] = useState<string[]>([]);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<THostingListData>(`/admin/hosting/manage`, query)
        .then(({ data }) => {
          if (data) {
            setCurrencies(data.currencies);
            setHostingListData(data?.hostings);
            setPackageData(data?.packages);
            setStatus(data?.status);
            setCpServers(data?.cpServers);
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
      packageData,
      currencies,
      cpServers,
      hostingListData,
      pagination,
      status,
      reload,
      loading: reloadKey === -1,
    };
  }, [hostingListData, reloadKey]);

  return (
    <HostingListContext.Provider value={value}>
      {children}
      <ModalAddHosting />
      <ModalUpdateBasic />
      <ModalUpdateOwnership />
      <ModalUpdatePricing />
      <ModalUpdatePackage />
      <ModalUpdateCurrency />
      <ModalUpdateDuration />
      <ModalUpdateHostingDates />
      <ModalCPLimit />
    </HostingListContext.Provider>
  );
};

export default HostingListProvider;
