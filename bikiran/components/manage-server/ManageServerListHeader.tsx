import { FC } from "react";
import { useServerInfo } from "./context/ManageServerProvider";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";

const filterFields: TFilterField[] = [
  {
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "Ex: Server 8 ",
  },
  {
    label: "Hostname ",
    name: "hostname ",
    type: "text",
    placeholder: "Ex: server-8.bikiran.net",
  },
  { label: "CPU", name: "cpu", type: "text", placeholder: "Ex: Intel Xeon-E" },
  {
    label: "Status",
    name: "status",
    type: "select",
    options: ["Active", "Inactive"],
  },
];
const ManageServerListHeader: FC = () => {
  const { reload, loading } = useServerInfo();

  return (
    <TableHeaderWrapperComp
      loading={loading}
      reload={reload}
      title="Server List"
      btnTitle="+ Create Server"
      modalType="create-server"
      fields={filterFields}
    />
  );
};

export default ManageServerListHeader;
