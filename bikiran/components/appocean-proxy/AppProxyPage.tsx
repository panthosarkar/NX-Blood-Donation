import { FC } from "react";
import AppsProxyListProvider from "./context/AppsProxyListProvider";
import AppsProxyListHeader from "./AppProxyListHeader";
import AppsProxyListTable from "./AppsProxyListTable";

const AppProxyPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <AppsProxyListProvider query={query}>
      <section>
        <AppsProxyListHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <AppsProxyListTable />
      </section>
    </AppsProxyListProvider>
  );
};

export default AppProxyPage;
