"use client";
import { FC } from "react";
import ClientInfoTableSection from "./ClientInfoTableSection";
import ClientInfoHeaderSection from "./ClientInfoHeaderSection";
import { ClientInfoProvider } from "./context/ClientInfoProvider";
import ModalAddClient from "./modals/ModalAddClient";
import ModalUpdateClient from "./modals/ModalUpdateClient";
import ModalUpdateClientLogo from "./modals/ModalUpdateClientLogo";

const ClientInfoPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <ClientInfoProvider query={query}>
      <div className="admin-section">
        <ClientInfoHeaderSection />
        <ClientInfoTableSection />
      </div>
      {/* modals */}
      <ModalAddClient />
      <ModalUpdateClient />
      <ModalUpdateClientLogo />
    </ClientInfoProvider>
  );
};

export default ClientInfoPage;
