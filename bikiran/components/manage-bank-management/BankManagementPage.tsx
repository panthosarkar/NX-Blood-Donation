import React, { FC } from "react";
import BankManagementProvider from "./context/BankManagementProvider";
import BankManagementBodySection from "./BankManagementBodySection";
import BankManagementHeaderSection from "./BankManagementHeaderSection";

const BankManagementPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <BankManagementProvider query={query}>
      <section>
        <BankManagementHeaderSection />
      </section>
      <section>
        <BankManagementBodySection />
      </section>
    </BankManagementProvider>
  );
};

export default BankManagementPage;
