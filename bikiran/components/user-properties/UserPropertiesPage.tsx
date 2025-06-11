"use client";
import UserPropertiesProvider, {
  useUserProp,
} from "./context/UserPropertiesProvider";
import { FC } from "react";
import { Pagination } from "@bikiran/utils";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import UserPropertiesTable from "./UserPropertiesTable";
import UserPropertiesHeader from "./UserPropertiesHeader";

const PageContent: FC = () => {
  const { pagination, loading } = useUserProp();
  return (
    <section>
      <UserPropertiesTable />
      <Pagination
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        data={pagination}
        disabled={loading}
      />
    </section>
  );
};

const UserPropertiesPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <UserPropertiesProvider query={query}>
      <section>
        <UserPropertiesHeader />
      </section>
      <PageContent />
    </UserPropertiesProvider>
  );
};

export default UserPropertiesPage;
