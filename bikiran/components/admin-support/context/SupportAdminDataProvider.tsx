"use client";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import { TTicketData } from "../SupportTypes";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import SupportAddTicketModal from "../modal/SupportAddTicketModal";
import useApi from "@/bik-lib/utils/useApi";

export type SupportAdminDataContextType = {
  reloadTicket: () => void;
  ticketData: TTicketData[] | null | undefined;
  reFetching: boolean;
  reloadKey: number;
  setReloadKey: (key: number) => void;
};
const SupportAdminDataContext = createContext<
  SupportAdminDataContextType | undefined
>(undefined);

export function useAdminSupportData() {
  const context = useContext(SupportAdminDataContext);
  return context as SupportAdminDataContextType;
}

const SupportAdminDataProvider = ({ children }: { children: ReactNode }) => {
  const [ticketData, setTicketData] = useState<
    TTicketData[] | null | undefined
  >(undefined);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  //handle to get all the tickets
  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/ticket`)
        .then(({ data }) => {
          setTicketData(data.tickets);
        })
        .catch(() => {
          setTicketData(null);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey]);

  const reloadTicket = () => {
    setReloadKey(-1);
  };

  const value = useMemo(() => {
    return {
      reloadTicket,
      ticketData,
      reFetching: reloadKey === -1,
      setReloadKey,
      reloadKey,
    };
  }, [reloadKey, ticketData]);

  return (
    <SupportAdminDataContext.Provider value={value}>
      {children}
      {/* Modals */}
      <SupportAddTicketModal />
    </SupportAdminDataContext.Provider>
  );
};

export default SupportAdminDataProvider;
