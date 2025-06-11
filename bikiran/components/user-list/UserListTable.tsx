import { FC } from "react";
import { Pagination } from "@bikiran/utils";
import { useUserList } from "./context/UserListProvider";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import UserListWeb from "./layout/UserListWeb";

const UserListTable: FC = () => {
  const { userListData, loading } = useUserList();

  return (
    <div>
      <UserListWeb data={userListData} />

      <Pagination
        data={userListData.pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || userListData?.users?.length === 0}
      />
    </div>
  );
};

export default UserListTable;
