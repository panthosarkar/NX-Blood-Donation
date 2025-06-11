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
import ModalCreateDomain from "../modals/ModalCreateDomainPackage";
import { TDomainPrice, TVendor } from "../DomainTypes";
import ModalUpdateDomainPackage from "../modals/ModalUpdateDomainPackage";
import { TPagination } from "@/bik-lib/types/response";
import useApi from "@/bik-lib/utils/useApi";

type DomainPricingContextType = {
  data: {
    domainPackages: TDomainPrice[];
    pagination: TPagination;
    status: string[];
  };
  reFetch: () => void;
  loading: boolean;
  vendorData: TVendor[];
};

// Create the context with default value
const DomainPricingContext = createContext<
  DomainPricingContextType | undefined
>(undefined);

// Custom hook to use DomainPricingContext
export function useDomain() {
  const context = useContext(DomainPricingContext);
  return context as DomainPricingContextType;
}

// Define the component props for AppProvider
type Props = {
  children: ReactNode;
  query: Record<string, any>;
};

const DomainPricingProvider: React.FC<Props> = ({ children, query }) => {
  const [data, setData] = useState<{
    domainPackages: TDomainPrice[];
    pagination: TPagination;
    status: string[];
  }>({
    domainPackages: [],
    pagination: {} as TPagination,
    status: [],
  });
  const [vendorData, setVendorData] = useState<TVendor[]>([]);
  const [reload, setReload] = useState<number>(-1);

  const { get } = useApi();

  useEffect(() => {
    if (reload !== -2) {
      get<{
        domainPackages: TDomainPrice[];
        pagination: TPagination;
        status: string[];
        vendors: TVendor[];
      }>(`/admin/domain/packages`, query)
        .then(({ data }) => {
          if (data) {
            setData(data);
            setVendorData(data?.vendors || []);
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
  // Memoized value to avoid unnecessary re-renders
  const value = useMemo(() => {
    return {
      vendorData,
      data,
      reFetch,
      loading: reload === -1,
    };
  }, [reload, data]);

  return (
    <DomainPricingContext.Provider value={value}>
      {children}
      {/* <ModalCreateDomain /> */}
      <ModalUpdateDomainPackage />
    </DomainPricingContext.Provider>
  );
};

export default DomainPricingProvider;
