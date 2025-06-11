"use client";
import { FC } from "react";
import CPanelProvider, { useCPanel } from "./context/CPanelProvider";
import CPanelHeaderSection from "./CPanelHeaderSection";
import CPanelListTable from "./CPanelListTable";
import { Pagination } from "@bikiran/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import ModalCPanelChangePassword from "./modal/ModalCPanelChangePassword";
import ModalCpUpdateDomain from "./modal/ModalCpUpdateDomain";
import ModalResizeCPanel from "./modal/ModalResizeCPanel";
import ModalCPanelSuspend from "./modal/ModalCPanelSuspend";
import ModalCPanelTerminate from "./modal/ModalCPanelTerminate";
import ModalCpLogin from "./modal/ModalCpLogin";
import ModalCpUpdateServer from "./modal/ModalCpUpdateServer";
import ModalCpMigrate from "./modal/ModalCpMigrate";
import ModalCPanelForceRemove from "./modal/ModalCPanelForceRemove";
import ModalCPanelShellAccess from "./modal/ModalCPanelShellAccess";
import ModalCPanelForceBackup from "./modal/ModalCPanelForceBackup";
import ModalAddCPanel from "./modal/ModalAddCPanel";
import ModalLocateCPanel from "./modal/ModalLocateCPanel";
import ModalPackageDetails from "./modal/ModalPackageInformation";

const CPanelTableComp: FC<{}> = () => {
  const { data, loading } = useCPanel();

  return (
    <section>
      <CPanelListTable data={data} />
      <Pagination
        data={data?.pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || data?.hostings?.length === 0}
      />
    </section>
  );
};
const CPanelPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <CPanelProvider query={query}>
      <section>
        <CPanelHeaderSection />
      </section>
      <CPanelTableComp />
      {/* Modals */}
      <ModalCPanelChangePassword />
      <ModalPackageDetails />
      <ModalCpUpdateDomain />
      <ModalResizeCPanel />
      <ModalCPanelSuspend />
      <ModalCPanelTerminate />
      <ModalCpLogin />
      <ModalCpUpdateServer />
      <ModalCpMigrate />
      <ModalCPanelForceRemove />
      <ModalCPanelShellAccess />
      <ModalCPanelForceBackup />
      <ModalAddCPanel />
      <ModalLocateCPanel />
    </CPanelProvider>
  );
};

export default CPanelPage;
