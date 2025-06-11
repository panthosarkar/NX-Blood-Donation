import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ICurrencyConfContext, TCurrencyConfData } from "../CurrencyConfTypes";
import CurrencyConfUpdateModal from "../modals/CurrencyConfUpdateModal";
import useApi from "@/bik-lib/utils/useApi";

const CurrencyConfContext = createContext<ICurrencyConfContext>({
  data: [],
  loading: false,
  reload: () => {},
  status: [],
});

export function useCurrencyConfContext() {
  const context = useContext(CurrencyConfContext);
  return context as ICurrencyConfContext;
}
interface IProps {
  children: React.ReactNode;
  query: Record<string, any>;
}

export const CurrencyConfProvider = ({ children, query }: IProps) => {
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<TCurrencyConfData[] | null | undefined>(
    undefined
  );
  const [status, setStatus] = useState<string[]>([]);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/billing/currency-configuration`, query)
        .then((data) => {
          setData(data.data.currencies);
          setStatus(data.data.statusOptions);
        })
        .catch(() => {
          setData(null);
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
      data: data,
      setData: setData,
      loading: reloadKey === -1,
      reload,
      status,
    };
  }, [data, reloadKey]);

  return (
    <CurrencyConfContext.Provider value={value}>
      {children}

      {/* modals */}
      <CurrencyConfUpdateModal />
    </CurrencyConfContext.Provider>
  );
};
