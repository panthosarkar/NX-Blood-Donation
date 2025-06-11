import { FC } from "react";
import { useServerInfo } from "./context/ManageServerProvider";
import MangeServerSkeleton from "./MangeServerSkeleton";
import ManageServerTableRowComp from "./ManageServerTableRowComp";
const ManageServerListTableSection: FC = () => {
  const { serverData, loading } = useServerInfo();

  return (
    <div className="flex flex-col gap-3">
      <table cellPadding={0} cellSpacing={0} className="table-container">
        <thead>
          <tr>
            <th className="w-[100px] !text-center">Id</th>
            <th className="w-[250px] text-start">Title</th>
            <th className="w-[200px] text-start">Hostname & Primary IP</th>
            <th className="w-[260px] text-start">CPU & RAM</th>
            <th className="w-[120px] text-start">Storage</th>
            <th className="w-[100px] text-center">Env.</th>
            <th className="w-[80px]">Status</th>
            <th className="w-[50px] text-right ">#</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: serverData?.length || 2 })
                .map((_, i) => i)
                .map((i) => <MangeServerSkeleton key={i} />)
            : serverData.map((item, index) => (
                <ManageServerTableRowComp key={index} data={item} />
              ))}
          {!loading && serverData.length === 0 && (
            <tr className="hover:!bg-transparent not-found">
              <td colSpan={8} className="text-center font-medium !text-xl h-40">
                No Server Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageServerListTableSection;
