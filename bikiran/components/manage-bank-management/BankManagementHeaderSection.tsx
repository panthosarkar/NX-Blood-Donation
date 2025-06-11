"use client";
import { FC } from "react";
import { useBankManagement } from "./context/BankManagementProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";

const BankManagementHeaderSection: FC = () => {
  const { accounts, loading, reload } = useBankManagement();

  return (
    <TableHeaderWrapperComp
      loading={loading}
      title="Bank Management"
      reload={reload}
      btnTitle="+ Add account"
      modalType="add:bank-account"
    ></TableHeaderWrapperComp>
  );
};

export default BankManagementHeaderSection;
