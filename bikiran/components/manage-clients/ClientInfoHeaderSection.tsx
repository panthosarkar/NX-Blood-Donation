import React from "react";
import { useClientInfo } from "./context/ClientInfoProvider";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";

const filterFields: TFilterField[] = [
  {
    label: "Organization",
    name: "organization",
    type: "text",
    placeholder: "Ex: bikiran",
  },
  {
    label: "Services",
    name: "services",
    type: "text",
    placeholder: "Ex: appocean",
  },

  {
    label: "Status",
    name: "status",
    type: "select",
    options: ["Active", "Inactive"],
  },
];
const ClientInfoHeaderSection = () => {
  const { reFetch, loading } = useClientInfo();

  return (
    <TableHeaderWrapperComp
      loading={loading}
      reload={reFetch}
      title="Clients List"
      btnTitle="+ Add Client"
      modalType="add-client"
      // fields={filterFields}
    />
  );
};

export default ClientInfoHeaderSection;
