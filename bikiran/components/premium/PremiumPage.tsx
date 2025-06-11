"use client";
import { FC } from "react";
import checkModal from "../../../bik-lib/utils/checkModal";
import PremiumSubsTable from "./PremiumSubsTable";
import PremiumSubsHeader from "./PremiumSubsHeader";
import PremiumInfoProvider from "./context/PremiumInfoProvider";

const PremiumPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  // Check for hash in URL to open specific modal
  // This is a client-side check to open modals based on URL hash
  checkModal("add-premium");

  return (
    <PremiumInfoProvider query={query}>
      <section>
        <PremiumSubsHeader />
      </section>
      <section className="overflow-visible custom-scrollbar">
        <PremiumSubsTable />
      </section>
    </PremiumInfoProvider>
  );
};

export default PremiumPage;
