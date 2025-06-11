"use client";

import React, { FC } from "react";
import DomainDeletedListHeader from "./DomainDeletedListHeader";
import DomainDeletedListProvider from "./context/DomainDeletedListProvider";
import DomainDeletedListTable from "./DomainDeletedListTable";

const DomainDeletedListPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <DomainDeletedListProvider query={query}>
      <section>
        <DomainDeletedListHeader />
      </section>
      <section>
        <DomainDeletedListTable />
      </section>
    </DomainDeletedListProvider>
  );
};

export default DomainDeletedListPage;
