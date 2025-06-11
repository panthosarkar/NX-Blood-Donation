import { FC } from "react";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import { useErrorLogs } from "./context/ErrorLogProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";

const filterFields: TFilterField[] = [
  // {
  //     label: "Title",
  //     name: "title",
  //     type: "text",
  //     placeholder: "Ex: Server 8 ",
  // },
  // {
  //     label: "Hostname ",
  //     name: "hostname ",
  //     type: "text",
  //     placeholder: "Ex: server-8.bikiran.net",
  // },
  // { label: "CPU", name: "cpu", type: "text", placeholder: "Ex: Intel Xeon-E" },
  // {
  //     label: "Status",
  //     name: "status",
  //     type: "select",
  //     options: ["Active", "Inactive"],
  // },
];

const ErrorLogsHeader: FC = () => {
  const { loading, reload } = useErrorLogs();

  return (
    <TableHeaderWrapperComp
      title="Error Logs"
      fields={filterFields}
      reload={reload}
      // btnTitle="+ Create Logs"
      // modalType="create-logs"
      loading={loading}
    />
  );
};

export default ErrorLogsHeader;
