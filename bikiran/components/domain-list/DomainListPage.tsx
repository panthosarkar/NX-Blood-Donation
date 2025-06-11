"use client";
import { FC } from "react";
import checkModal from "@/bik-lib/utils/checkModal";
import DomainListTable from "./DomainListTable";
import DomainListHeader from "./DomainListHeader";
import DomainListProvider from "./context/DomainListProvider";

const DomainListPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  // Check for hash in URL to open specific modal
  // This is a client-side check to open modals based on URL hash
  checkModal("domain-add");

  return (
    <DomainListProvider query={query}>
      <section>
        <DomainListHeader />
      </section>
      <section className="overflow-visible custom-scrollbar">
        <DomainListTable />
      </section>
    </DomainListProvider>
  );
};

export default DomainListPage;
