"use client";
import { FC } from "react";
import checkModal from "@/bik-lib/utils/checkModal";
import HostingListProvider from "./context/HostingListProvider";
import HostingListTableSection from "./HostingListTableSection";
import HostingListHeaderSection from "./HostingListHeaderSection";

const HostingListPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  // Check for hash in URL to open specific modal
  // This is a client-side check to open modals based on URL hash
  checkModal("create-hosting");

  return (
    <HostingListProvider query={query}>
      <section>
        <HostingListHeaderSection />
      </section>
      <section>
        <HostingListTableSection />
      </section>
    </HostingListProvider>
  );
};

export default HostingListPage;
