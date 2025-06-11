"use client";
import { FC } from "react";
import { Pagination } from "@bikiran/utils";
import { useHostingList } from "./context/HostingListProvider";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import HostingListTableComp from "./HostingListTableComp";

const HostingListTableSection: FC = () => {
  const { hostingListData, loading, pagination } = useHostingList();

  return (
    <div>
      <HostingListTableComp />
      <Pagination
        data={pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || hostingListData?.length === 0}
      />
    </div>
  );
};

export default HostingListTableSection;
