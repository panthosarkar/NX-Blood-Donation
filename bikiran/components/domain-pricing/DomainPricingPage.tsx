"use client";
import { FC } from "react";
import DomainTableSection from "./DomainTableSection";
import DomainPricingProvider, {
  useDomain,
} from "./context/DomainPricingProvider";
import DomainPricingHeaderSection from "./DomainPricingHeaderSection";
import { Pagination } from "@bikiran/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const DomainPricingTableComp: FC = () => {
  const { data, loading } = useDomain();

  return (
    <div>
      <DomainTableSection data={data} />
      <Pagination
        data={data?.pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || data?.domainPackages?.length === 0}
      />
    </div>
  );
};
const DomainPricingPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <DomainPricingProvider query={query}>
      <section>
        <DomainPricingHeaderSection />
      </section>
      <section>
        <DomainPricingTableComp />
      </section>
    </DomainPricingProvider>
  );
};

export default DomainPricingPage;
