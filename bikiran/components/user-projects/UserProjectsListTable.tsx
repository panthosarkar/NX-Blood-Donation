"use client";
import { FC } from "react";
import Link from "next/link";
import { useUserProjectsList } from "./context/UserProjectsListProvider";
import UserProjectsListWeb from "./layout/UserProjectsListWeb";
import { Pagination } from "@bikiran/utils";
import { usePathname, useSearchParams } from "next/navigation";

const UserProjectsListTable: FC = () => {
  const { userProjectsData, loading } = useUserProjectsList();

  return (
    <div>
      {/* {windowWidth > SIZE_MD ? (
        <UserEmailsListWeb data={userEmailsData} />
      ) : (
        <UserListMobile data={userEmailsData} />
      )} */}
      <UserProjectsListWeb data={userProjectsData} />
      <Pagination
        data={userProjectsData.pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || userProjectsData?.projects.length === 0}
      />
    </div>
  );
};

export default UserProjectsListTable;
