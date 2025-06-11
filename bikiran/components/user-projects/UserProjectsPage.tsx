import React, { FC } from "react";
import UserProjectsListProvider from "./context/UserProjectsListProvider";
import UserProjectsHeaderSection from "./UserProjectsHeaderSection";
import UserProjectsListTable from "./UserProjectsListTable";

const UserProjectsPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <UserProjectsListProvider query={query}>
      <section>
        <UserProjectsHeaderSection />
      </section>
      <section>
        <UserProjectsListTable />
      </section>
    </UserProjectsListProvider>
  );
};

export default UserProjectsPage;
