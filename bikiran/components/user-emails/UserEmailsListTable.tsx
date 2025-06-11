"use client";
import { FC } from "react";
import { useUserEmailsList } from "./context/UserEmailsListProvider";
import UserEmailsListWeb from "./layout/UserEmailsListWeb";
import { Pagination } from "@bikiran/utils";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const UserEmailsListTable: FC = () => {
  const { loading, userEmailsData } = useUserEmailsList();

  return (
    <div>
      {/* {windowWidth > SIZE_MD ? (
        <UserEmailsListWeb data={userEmailsData} />
      ) : (
        <UserListMobile data={userEmailsData} />
      )} */}
      <UserEmailsListWeb data={userEmailsData} />
      <Pagination
        data={userEmailsData?.pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || userEmailsData?.contacts?.length === 0}
      />
    </div>
  );
};

export default UserEmailsListTable;
