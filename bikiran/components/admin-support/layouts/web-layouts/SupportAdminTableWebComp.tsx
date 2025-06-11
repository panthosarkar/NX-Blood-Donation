import React from "react";
import { useAdminSupportData } from "../../context/SupportAdminDataProvider";
import SupportAdminTableBodyComp from "./SupportAdminTableBodyComp";
import SupportAdminTableSkeletonComp from "./SupportAdminTableSkeletonComp";

const SupportAdminTableWebComp = () => {
  const { ticketData, reFetching } = useAdminSupportData();

  return (
    <div className="flex flex-col gap-3">
      <table className="table-container table-fixed">
        <thead>
          <tr>
            <th className="w-[100px] !text-center">ID</th>
            <th className="w-[80px]">User</th>
            <th className="text-start w-[250px]">Subject</th>
            <th className="w-[80px] text-center">Project</th>
            <th className="w-[150px] text-center">Department</th>
            <th className="w-[150px] text-center">Time Created</th>
            <th className="w-[80px] text-center">Status</th>
            {/* <th className="w-[220px] text-left">Time Updated</th> */}
            <th className="w-[80px] text-center">#</th>
          </tr>
        </thead>
        <tbody>
          {reFetching
            ? Array.from({ length: ticketData?.length || 2 })
                .map((_, i) => i)
                .map((i) => <SupportAdminTableSkeletonComp key={i} />)
            : ticketData?.map((item) => (
                <SupportAdminTableBodyComp key={item.id} data={item} />
              ))}
          {!reFetching && ticketData?.length === 0 && (
            <tr className="hover:!bg-transparent not-found">
              <td colSpan={8} className="text-center font-medium !text-xl h-40">
                No Ticket Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupportAdminTableWebComp;
