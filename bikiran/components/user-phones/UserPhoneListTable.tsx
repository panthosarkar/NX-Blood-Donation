"use client";
import { FC } from "react";
import Link from "next/link";
import { useUserPhonesList } from "./context/UserPhonesListProvider";
import UserPhonesListWeb from "./layout/UserPhonesListWeb";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@bikiran/utils";

const UserPhonesListTable: FC = () => {
  const { loading, userPhonesData } = useUserPhonesList();

  return (
    <div>
      {/* {windowWidth > SIZE_MD ? (
        <UserEmailsListWeb data={userEmailsData} />
      ) : (
        <UserListMobile data={userEmailsData} />
      )} */}
      <UserPhonesListWeb data={userPhonesData} />

      <Pagination
        data={userPhonesData.pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || userPhonesData?.contacts?.length === 0}
      />
    </div>
  );
};

export default UserPhonesListTable;
