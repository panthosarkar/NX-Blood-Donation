import { FC } from "react";
import AppsDomainListProvider from "./context/AppsDomainListProvider";
import AppsDomainListHeader from "./AppDomainListHeader";
import AppsDomainListTable from "./AppsDomainListTable";

const AppDomainListPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <AppsDomainListProvider query={query}>
      <section>
        <AppsDomainListHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <AppsDomainListTable />
      </section>
    </AppsDomainListProvider>
  );
};

export default AppDomainListPage;
