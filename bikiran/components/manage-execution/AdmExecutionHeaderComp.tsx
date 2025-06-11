import { FC } from "react";
import { useAdmExecution } from "./context/AdmExecutionProvider";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";

const filterFields: TFilterField[] = [
  {
    label: "Reference ID",
    name: "referenceId ",
    type: "text",
    placeholder: "Ex: 1234",
  },
  {
    label: "Domain",
    name: "domain",
    type: "text",
    placeholder: "Ex: bikiran.com",
  },

  {
    label: "Status",
    name: "status",
    type: "select",
    options: ["Active", "Inactive"],
  },
];
const AdmExecutionHeaderComp: FC = () => {
  const { reFetch, reFetching } = useAdmExecution();

  return (
    <TableHeaderWrapperComp
      loading={reFetching}
      reload={reFetch}
      title="Invoice Execution"
      // fields={filterFields}
    />
  );
};

export default AdmExecutionHeaderComp;
