"use client";
import { FC } from "react";
import AdmExecutionTableRowComp from "./AdmExecutionTableRowComp";
import { useAdmExecution } from "./context/AdmExecutionProvider";
import AdmExecutionSkeletonComp from "./AdmExecutionSkeletonComp";

const AdmExecutionTableSection: FC<any> = ({ filterState }) => {
  const { admExecuteData, reFetching } = useAdmExecution();

  const filteredData = Array.isArray(admExecuteData)
    ? admExecuteData.filter(
        (item) =>
          filterState === "all" ||
          item.referenceKey.toLowerCase() === filterState
      )
    : [];

  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="w-[100px] !text-center">ID</th>
          <th className="w-[200px] text-center">Reference ID</th>
          <th className="w-[200px] text-center">Reference Key</th>
          <th className="w-[200px] text-left">Domain</th>
          <th className="w-[100px]">Success</th>
          <th className="w-[120px]">Created</th>
          <th className="w-[150px]">Status</th>
          <th className="w-[100px] !text-center">#</th>
        </tr>
      </thead>
      <tbody>
        {reFetching
          ? Array.from({ length: filteredData?.length || 2 })
              .map((_, i) => i)
              .map((i) => <AdmExecutionSkeletonComp key={i} />)
          : filteredData.map((item) => (
              <AdmExecutionTableRowComp key={item.id} data={item} />
            ))}
        {!reFetching && filteredData?.length === 0 && (
          <tr className="hover:!bg-transparent not-found">
            <td colSpan={8} className="text-center font-medium !text-xl h-40">
              No Invoice Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AdmExecutionTableSection;
