import React, { FC } from "react";
import AppsListProvider from "./context/AppsListProvider";
import AppsListHeader from "./AppsListHeader";
import AppsListTable from "./AppsListTable";

const AppsListPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <AppsListProvider query={query}>
      <section>
        <AppsListHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <AppsListTable />
      </section>
    </AppsListProvider>
  );
};
export default AppsListPage;
