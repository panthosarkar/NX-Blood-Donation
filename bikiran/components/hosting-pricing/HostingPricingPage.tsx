"use client";

import React, { FC } from "react";
import HostingPricingProvider, {
  useHosting,
} from "./context/HostingPricingProvider";
import HostingPricingHeaderSection from "./HostingPricingHeaderSection";
import HostingTableSection from "./HostingTableSection";
import { Pagination } from "@bikiran/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const HostingPricingTableSection: FC = () => {
  const { hostingPriceData, loading } = useHosting();
  return (
    <div>
      <HostingTableSection />
      <Pagination
        data={hostingPriceData?.pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || hostingPriceData?.hostingPackages?.length === 0}
      />
    </div>
  );
};
const HostingPricingPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <HostingPricingProvider query={query}>
      <div className="admin-section">
        <HostingPricingHeaderSection />
        <HostingPricingTableSection />
      </div>
    </HostingPricingProvider>
  );
};

export default HostingPricingPage;
