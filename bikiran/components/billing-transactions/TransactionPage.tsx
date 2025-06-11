"use client";
import TransactionProvider, {
  useTransaction,
} from "./context/TransactionProvider";
import { FC } from "react";
import { Pagination } from "@bikiran/utils";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import TransactionTableSection from "./TransactionTableSection";
import TransactionHeaderSection from "./TransactionHeaderSection";

const TransactionTableComp: FC = () => {
  const { transaction, reFetching, pagination } = useTransaction();

  return (
    <div>
      <TransactionTableSection />
      <Pagination
        data={pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={reFetching || transaction?.length === 0}
      />
    </div>
  );
};
const TransactionPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <TransactionProvider query={query}>
      <div className="admin-section">
        <TransactionHeaderSection />
        <TransactionTableComp />
      </div>
    </TransactionProvider>
  );
};

export default TransactionPage;
