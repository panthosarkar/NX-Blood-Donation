import { FC } from "react";
import AppsStorageListProvider from "./context/AppsStorageListProvider";
import AppsStorageListHeader from "./AppStorageListHeader";
import AppsStorageListTable from "./AppsStorageListTable";

const AppStorageListPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <AppsStorageListProvider query={query}>
      <section>
        <AppsStorageListHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <AppsStorageListTable />
      </section>
    </AppsStorageListProvider>
  );
};

export default AppStorageListPage;
