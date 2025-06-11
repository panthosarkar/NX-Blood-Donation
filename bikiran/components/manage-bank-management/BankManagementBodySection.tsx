"use client";
import { FC } from "react";
import Link from "next/link";
import { useBankManagement } from "./context/BankManagementProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@bikiran/utils";
import BankManagementTable from "./BankManagementTable";

const BankManagementBodySection: FC = () => {
  const { loading, pageData } = useBankManagement();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("CurrentPage")) || 1;
  const makeUrl = (num: number) => {
    const queries = new URLSearchParams(searchParams.toString());
    queries.set("CurrentPage", num.toString());
    return `${pathname}?${queries.toString()}`;
  };

  return (
    <div>
      <BankManagementTable />

      {/* <Pagination
        data={bankManagementData.pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || bankManagementData?.data?.length === 0}
      /> */}
    </div>
  );
};

export default BankManagementBodySection;
