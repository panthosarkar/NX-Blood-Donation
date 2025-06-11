import { FC } from "react";
import AppsTunnelListProvider from "./context/AppsTunnelListProvider";
import AppsTunnelListHeader from "./AppTunnelListHeader";
import AppsTunnelListTable from "./AppsTunnelListTable";

const AppTunnelPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <AppsTunnelListProvider query={query}>
      <section>
        <AppsTunnelListHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <AppsTunnelListTable />
      </section>
    </AppsTunnelListProvider>
  );
};

export default AppTunnelPage;
