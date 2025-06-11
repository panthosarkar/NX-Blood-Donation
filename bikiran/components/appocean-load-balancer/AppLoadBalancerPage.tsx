import { FC } from "react";
import AppsLoadBalancerProvider from "./context/AppsLoadBalancerProvider";
import AppsLoadBalancerHeader from "./AppLoadBalancerHeader";
import AppsLoadBalancerTable from "./AppsLoadBalancerTable";

const AppLoadBalancerPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <AppsLoadBalancerProvider query={query}>
      <section>
        <AppsLoadBalancerHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <AppsLoadBalancerTable />
      </section>
    </AppsLoadBalancerProvider>
  );
};
export default AppLoadBalancerPage;
