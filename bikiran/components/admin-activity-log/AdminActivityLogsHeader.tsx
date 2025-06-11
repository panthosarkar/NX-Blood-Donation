import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import { FC } from "react";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import { useActivityAdmin } from "./context/AdminActivityProvider";

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
const AdminActivityLogsHeader: FC = () => {
  const { openModal } = useTemplate();
  const { loading, reload } = useActivityAdmin();

  return (
    <div className="flex justify-between items-center gap-2 mb-3">
      <div className="flex items-center gap-x-8 gap-y-2 flex-1">
        <h2 className="text-xl font-medium">Admin Activity Logs</h2>
        <div className="min-w-[500px] max-w-[700px] w-full">
          {/* <FilterBar
                        fields={filterFields}
                        onSearch={(val: Record<string, any>) => console.log(val)}
                    // disabled
                    /> */}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-10">
          <ButtonRefresh onClick={reload} disabled={loading} />
        </div>
        {/* <Button
                    variant="secondary"
                    className="px-4 h-10"
                    onClick={() => openModal("create-server")}
                    disabled={loading}
                >
                    + Create Logs
                </Button> */}
      </div>
    </div>
  );
};

export default AdminActivityLogsHeader;
