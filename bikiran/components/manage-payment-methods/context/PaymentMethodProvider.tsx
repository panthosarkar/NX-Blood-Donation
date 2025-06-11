import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TPaymentMethod } from "../PaymentMethodTypes";
import useApi from "@/bik-lib/utils/useApi";

type TPaymentContext = {
  data: TPaymentMethod;
  loading: boolean;
  reload: () => void;
  query?: Record<string, any>;
};

const PaymentContext = createContext<TPaymentContext>({
  data: {} as TPaymentMethod,
  loading: false,
  reload: () => {},
  query: {},
});

export const usePaymentMethod = () => {
  const context = useContext(PaymentContext);
  return context;
};

type TProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const PaymentMethodProvider: FC<TProps> = ({ children, query }) => {
  // reload -2 = no reload, -1 = reload, -1 = default
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<TPaymentMethod>({
    gateways: [],
    filters: {
      statusOptions: [],
      currencyOptions: [
        {
          currency: "",
          title: "",
        },
      ],
    },
  });
  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/gateway/configuration`, query)
        .then(({ data }) => {
          if (data) {
            setData(data);
          }
        })
        .catch((err) => {
          console.error(err);
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
      data,
      loading: reloadKey === -1,
      reload: reload,
      query,
    };
  }, [data, reloadKey]);

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export default PaymentMethodProvider;
