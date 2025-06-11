import { FC } from "react";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import { useActivityUser } from "./context/UserActivityProvider";
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
const UserActivityLogsHeader: FC = () => {
  const { loading, reload } = useActivityUser();

  return (
    <TableHeaderWrapperComp
      title="User Activity Logs"
      //   fields={filterFields}
      reload={reload}
      //   btnTitle="+ Create Logs"
      //   modalType="create-logs"
      loading={loading}
    />
  );
};

export default UserActivityLogsHeader;
