"use client";
import { FC } from "react";
import { SIZE_MD, useLayout } from "@/bik-lib/context/LayoutProvider";
import UserAddressListWeb from "./layout/UserAddressListWeb";
import { useUserAddressList } from "./context/UserAddressListProvider";
import { Pagination } from "@bikiran/utils";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const UserAddressListTable: FC = () => {
  const { loading, userAddressData, pagination } = useUserAddressList();

  return (
    <div>
      {/* {windowWidth > SIZE_MD ? (
        <UserEmailsListWeb data={userEmailsData} />
      ) : (
        <UserListMobile data={userEmailsData} />
      )} */}
      <UserAddressListWeb data={userAddressData} />
      <Pagination
        data={pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || userAddressData?.length === 0}
      />
    </div>
  );
};

export default UserAddressListTable;
