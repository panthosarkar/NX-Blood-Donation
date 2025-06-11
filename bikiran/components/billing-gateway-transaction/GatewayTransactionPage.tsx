"use client";

import React, { FC } from "react";
import GatewayTransactionProvider, {
  useGatewayTransaction,
} from "./context/GatewayTransactionProvider";
import GatewayTransactionHeaderSection from "./GatewayTransactionHeaderSection";
import GatewayTransactionTableSection from "./GatewayTransactionTableSection";
import { Pagination } from "@bikiran/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const GatewayTransactionTableComp: FC = () => {
  const { gatewayTransaction, reFetching, pagination } =
    useGatewayTransaction();

  return (
    <div>
      <GatewayTransactionTableSection />
      <Pagination
        data={pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={reFetching || !gatewayTransaction}
      />
    </div>
  );
};
const GatewayTransactionPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <GatewayTransactionProvider query={query}>
      <div className="admin-section">
        <GatewayTransactionHeaderSection />
        <GatewayTransactionTableComp />
      </div>
    </GatewayTransactionProvider>
  );
};

export default GatewayTransactionPage;
