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
import { THostingPkg } from "../HostingTypes";
import ModalCreateHostingPackage from "../modals/ModalCreateHostingPackage";
import ModalUpdateHostingPackage from "../modals/ModalUpdateHostingPack";
import { TPagination } from "@/bik-lib/types/response";
import ModalServerConfig from "../modals/ModalServerConfiguration";
import useApi from "@/bik-lib/utils/useApi";

type HostingPricingContextType = {
  hostingPriceData: {
    cpServers: string[];
    diskTypes: string[];
    hostingPackages: THostingPkg[];
    locations: string[];
    pagination: TPagination;
    status: string[];
    subTypes: string[];
    vendors: string[];
    currencies: string[];
  };
  loading: boolean;
  reload: () => void;
};

type THostingData = {
  hostingPackages: THostingPkg[];
  status: string[];
  subTypes: string[];
  diskTypes: string[];
  locations: string[];
  pagination: TPagination;
  cpServers: string[];
  vendors: string[];
  currencies: string[];
};

const HostingPricingContext = createContext<HostingPricingContextType>({
  hostingPriceData: {
    hostingPackages: [],
    pagination: {} as TPagination,
    status: [],
    subTypes: [],
    diskTypes: [],
    locations: [],
    cpServers: [],
    vendors: [],
    currencies: [],
  },
  loading: false,
  reload: () => {},
});

export function useHosting() {
  const context = useContext(HostingPricingContext);
  return context as HostingPricingContextType;
}

type Props = {
  children: ReactNode;
  query: Record<string, any>;
};
const HostingPricingProvider: React.FC<Props> = ({ children, query }) => {
  const [hostingPriceData, setHostingPriceData] = useState<THostingData>({
    hostingPackages: [],
    status: [],
    subTypes: [],
    diskTypes: [],
    locations: [],
    pagination: {} as TPagination,
    cpServers: [],
    vendors: [],
    currencies: [],
  });
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<THostingData>(`/admin/hosting/packages`, query)
        .then(({ data }) => {
          if (data) {
            setHostingPriceData(data);
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
      hostingPriceData,
      reload,
      loading: reloadKey === -1,
    };
  }, [reloadKey, hostingPriceData]);

  return (
    <HostingPricingContext.Provider value={value}>
      {children}
      <ModalCreateHostingPackage />
      <ModalUpdateHostingPackage />
      <ModalServerConfig />
    </HostingPricingContext.Provider>
  );
};

export default HostingPricingProvider;
