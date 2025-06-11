"use client";
import { FC } from "react";
import { useAppsStorageList } from "./context/AppsStorageListProvider";
import AppsStorageListWeb from "./AppsStorageListWeb";
// import Pagination from "@/bikiran/shared/pagination/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@bikiran/utils";
import Link from "next/link";
// import { SIZE_MD, useLayout } from "@/bik-lib/context/LayoutProvider";
// import UserListMobile from "./layout/UserListMobile";

const AppsStorageListTable: FC = () => {
  const { storageList, loading } = useAppsStorageList();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("CurrentPage")) || 1;
  const makeUrl = (num: number) => {
    const queries = new URLSearchParams(searchParams.toString());
    queries.set("CurrentPage", num.toString());
    return `${pathname}?${queries.toString()}`;
  };
  // const { windowWidth } = useLayout();

  return (
    <div>
      <AppsStorageListWeb data={storageList} />

      {/* {windowWidth > SIZE_MD ? (
        <UserListWeb data={userListData} />
      ) : (
        <UserListMobile data={userListData} />
      )} */}
      <Pagination
        data={storageList.pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || storageList?.storage?.length === 0}
      />
    </div>
  );
};

export default AppsStorageListTable;
