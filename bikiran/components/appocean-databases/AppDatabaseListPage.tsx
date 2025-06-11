import { FC } from "react";
import AppsDatabaseListProvider from "./context/AppsDatabaseListProvider";
import AppsDatabaseListHeader from "./AppDatabaseListHeader";
import AppsDatabaseListTable from "./AppsDatabaseListTable";

const AppDatabaseListPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <AppsDatabaseListProvider query={query}>
      <section>
        <AppsDatabaseListHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <AppsDatabaseListTable />
      </section>
    </AppsDatabaseListProvider>
  );
};

export default AppDatabaseListPage;
