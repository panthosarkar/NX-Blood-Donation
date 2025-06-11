"use client";

import React, { FC } from "react";
import AdminActivityProvider, {
  useActivityAdmin,
} from "./context/AdminActivityProvider";
import AdminActivityLogsHeader from "./AdminActivityLogsHeader";
import AdminActivityLogsTable from "./AdminActivityLogsTable";
import { Pagination } from "@bikiran/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const AdminActivityLogsTableSection: FC = () => {
  const { loading, data, pagination } = useActivityAdmin();

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
      <AdminActivityLogsTable data={data} />

      {/* <Pagination
        data={pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || data?.length === 0}
      /> */}
    </div>
  );
};

const AdminActivityLogsPage = () => {
  return (
    <AdminActivityProvider>
      <AdminActivityLogsHeader />
      <AdminActivityLogsTableSection />
    </AdminActivityProvider>
  );
};

export default AdminActivityLogsPage;
