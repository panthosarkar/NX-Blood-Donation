"use client";
import { FC } from "react";
import ManageServerListHeader from "./ManageServerListHeader";
import ManageServerListTable from "./ManageServerListTableSection";
import ManageServerProvider from "./context/ManageServerProvider";
import ManageServerListTableSection from "./ManageServerListTableSection";

const ManageServerPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <ManageServerProvider query={query}>
      <section>
        <ManageServerListHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <ManageServerListTableSection />
      </section>
    </ManageServerProvider>
  );
};

export default ManageServerPage;
