import React, {
  FC,
  useMemo,
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext,
} from "react";
import { TPremium } from "../PremiumType";
import useApi from "@/bik-lib/utils/useApi";
import ModalAddPremium from "../modal/ModalAddPremium";
import ModalUpdateDuration from "../modal/ModalUpdateDuration";
import ModalUpdatePremiumBasic from "../modal/ModalUpdatePremiumBasic";
import ModalUpdatePremiumDates from "../modal/ModalUpdatePremiumDates";
import ModalUpdatePremiumPricing from "../modal/ModalUpdatePremiumPricing";
import ModalUpdatePremiumCurrency from "../modal/ModalUpdatePremiumCurrency";
import ModalUpdatePremiumOwnership from "../modal/ModalUpdatePremiumOwnership";

type TContext = {
  data: TPremium;
  loading: boolean;
  reload: () => void;
};

const PremiumContext = createContext<TContext | undefined>(undefined);

export const usePremiumInfo = () => {
  const context = useContext(PremiumContext);
  return context as TContext;
};

type TProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const PremiumInfoProvider: FC<TProps> = ({ children, query }) => {
  // reload -2 = no reload, -1 = reload, -1 = default
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<TPremium>({} as TPremium);
  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<TPremium>(`/admin/premium-contract`, query)
        .then(({ data }) => {
          setData(data as TPremium);
        })
        .catch((er: Error) => {
          console.log(er.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey]);

  useEffect(() => {
    setReloadKey(-1);
  }, [query]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };

    return {
      data: data,
      reload,
      loading: reloadKey === -1,
    };
  }, [data, reloadKey]);

  return (
    <PremiumContext.Provider value={value}>
      {children}
      <ModalUpdatePremiumPricing />
      <ModalUpdatePremiumBasic />
      <ModalUpdatePremiumOwnership />
      <ModalAddPremium />
      <ModalUpdateDuration />
      <ModalUpdatePremiumCurrency />
      <ModalUpdatePremiumDates />
    </PremiumContext.Provider>
  );
};

export default PremiumInfoProvider;
