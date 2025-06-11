import React from "react";
import { useCurrencyConfContext } from "./context/CurrencyConfProvider";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";

const filterFields: TFilterField[] = [
  {
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "Ex: Bangladeshi Taka",
  },
  {
    label: "Currency",
    name: "currency",
    type: "text",
    placeholder: "Ex: BDT",
  },

  {
    label: "Status",
    name: "status",
    type: "select",
    options: ["Active", "Inactive"],
  },
];
const CurrencyConfHeaderSection = () => {
  const { reload, loading } = useCurrencyConfContext();

  return (
    <TableHeaderWrapperComp
      loading={loading}
      reload={reload}
      title="Currency Configuration"
      // btnTitle="+ Add Currency"
      // modalType="add-currency"
      // fields={filterFields}
    />
  );
};

export default CurrencyConfHeaderSection;
