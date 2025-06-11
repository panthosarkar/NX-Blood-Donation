"use client";

import React, { FC } from "react";
import UserActivityProvider, {
  useActivityUser,
} from "./context/UserActivityProvider";
import UserActivityLogsTable from "./UserActivityLogsTable";
import UserActivityLogsHeader from "./UserActivityLogsHeader";
import { Pagination } from "@bikiran/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const UserActivityLogsTableSection: FC = () => {
  const { loading, data, pagination } = useActivityUser();

  return (
    <div>
      <UserActivityLogsTable />
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
const UserActivityLogsPage: FC<{ query: Record<string, any> }> = ({
  query,
}) => {
  return (
    <UserActivityProvider query={query}>
      <UserActivityLogsHeader />
      <UserActivityLogsTableSection />
    </UserActivityProvider>
  );
};

export default UserActivityLogsPage;
