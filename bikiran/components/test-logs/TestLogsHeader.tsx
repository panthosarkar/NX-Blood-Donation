import { FC } from "react";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import { useTestLogs } from "./context/TestLogsProvider";
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

const TestLogsHeader: FC = () => {
  const { loading, reload } = useTestLogs();

  return (
    <TableHeaderWrapperComp
      title="Test Logs"
      fields={filterFields}
      reload={reload}
      // btnTitle="+ Create Logs"
      // modalType="create-logs"
      loading={loading}
    />
  );
};

export default TestLogsHeader;
