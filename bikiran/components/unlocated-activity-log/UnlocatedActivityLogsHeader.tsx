import { FC } from "react";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import { useActivityUnlocated } from "./context/UnlocatedActivityProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";

const filterFields: TFilterField[] = [
  {
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "Ex: Server 8 ",
  },
  {
    label: "Status",
    name: "status",
    type: "select",
    options: ["Active", "Inactive"],
  },
];
const UnlocatedActivityLogsHeader: FC = () => {
  const { loading, reload } = useActivityUnlocated();
  return (
    <TableHeaderWrapperComp
      title="Unlocated Activity Logs"
      fields={filterFields}
      reload={reload}
      // btnTitle="+ Create Logs"
      // modalType="create-logs"
      loading={loading}
    />
  );
};

export default UnlocatedActivityLogsHeader;
