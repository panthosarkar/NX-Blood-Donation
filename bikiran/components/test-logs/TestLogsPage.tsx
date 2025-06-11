"use client";
import React, { FC } from "react";
import TestLogsProvider, { useTestLogs } from "./context/TestLogsProvider";
import { Pagination } from "@bikiran/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import TestLogsTable from "./TestLogsTable";
import TestLogsHeader from "./TestLogsHeader";

const TestLogsTableSection: FC = () => {
  const { loading, data, pagination } = useTestLogs();

  return (
    <div>
      <TestLogsTable />

      <Pagination
        data={pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || data?.length === 0}
      />
    </div>
  );
};

const TestLogsPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <TestLogsProvider query={query}>
      <TestLogsHeader />
      <TestLogsTableSection />
    </TestLogsProvider>
  );
};

export default TestLogsPage;
