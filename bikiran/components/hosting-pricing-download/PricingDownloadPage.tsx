"use client";
import { THostingPkg } from "../hosting-pricing/HostingTypes";
import { FC, useEffect, useState } from "react";
import useApi from "@/bik-lib/utils/useApi";
import Wrapper from "./Wrapper";
import PricingComp from "./PricingComp";

const PricingDownloadPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  const [pageData, setPageData] = useState<THostingPkg[]>([]);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<{ hostingPackages: THostingPkg[] }>(`/admin/hosting/packages`, query)
        .then(({ data }) => {
          if (data) {
            setPageData(data.hostingPackages);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey, query]);

  return (
    <div className="space-y-8 print:space-y-0">
      <Wrapper>
        <PricingComp data={pageData} query={query} type="WEB" />
      </Wrapper>
      <Wrapper>
        <PricingComp data={pageData} query={query} type="APP" />
      </Wrapper>
      <Wrapper>
        <PricingComp data={pageData} query={query} type="EMAIL" />
      </Wrapper>
    </div>
  );
};

export default PricingDownloadPage;
