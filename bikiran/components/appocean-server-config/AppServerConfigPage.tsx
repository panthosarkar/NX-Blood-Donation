import { FC } from "react";
import AppsServerListProvider from "./context/AppsServerListProvider";
import AppsServerListHeader from "./AppServerListHeader";
import AppsServerListTable from "./AppsServerListTable";

const AppServerConfigPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <AppsServerListProvider query={query}>
      <section>
        <AppsServerListHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <AppsServerListTable />
      </section>
    </AppsServerListProvider>
  );
};
export default AppServerConfigPage;
