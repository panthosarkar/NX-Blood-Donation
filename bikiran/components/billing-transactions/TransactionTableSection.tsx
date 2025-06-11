"use client";
import { FC } from "react";
import { useTransaction } from "./context/TransactionProvider";
import TransactionTableBodyComp from "./TransactionTableBodyComp";
import TransactionTableSkeletonComp from "./TransactionTableSkeletonComp";

const TransactionTableSection: FC = () => {
  const { reFetching, transaction } = useTransaction();

  return (
    <div className="flex flex-col gap-3">
      <table className="table-container">
        <thead>
          <tr>
            <th className="!text-center w-[100px]">ID</th>
            <th className="text-center w-[150px]">Invoice ID</th>
            <th className="text-center w-[120px]">Type</th>
            <th className="text-left ">Description</th>
            <th className="text-start w-[250px]">Debit - Credit</th>
            <th className="text-center w-[100px]">Balance</th>
            <th className="text-center w-[120px]">Time Created</th>
            <th className="text-center w-[100px]">Status</th>
            <th className="text-right w-[50px]">#</th>
          </tr>
        </thead>

        {reFetching && (
          <TransactionTableSkeletonComp length={transaction?.length} />
        )}
        {/* Not found */}
        {!reFetching && transaction.length === 0 && (
          <tbody className="table-fixed">
            <tr className="not-found">
              <td colSpan={9} className="text-center font-medium text-lg">
                No Transaction Found
              </td>
            </tr>
          </tbody>
        )}
        {!reFetching && <TransactionTableBodyComp data={transaction} />}
      </table>
    </div>
  );
};

export default TransactionTableSection;
