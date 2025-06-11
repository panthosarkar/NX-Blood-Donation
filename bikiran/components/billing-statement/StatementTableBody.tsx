import { TInvoiceInfo, TInvoiceProduct } from "@/bik-lib/types/invoice";
import { FC } from "react";
import { TStatementTransaction } from "./statementTypes";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import { useStatementInfo } from "./context/StatementProvider";

const StatementTableBody: FC<{
  data: TStatementTransaction;
  editable: boolean;
}> = ({ data, editable }) => {
  const { statement } = useStatementInfo();
  return (
    <tbody>
      <tr className="[&>td]:border [&>td]:border-black [&>td]:px-2 [&>td]:py-2">
        <td className="border border-black px-2 py-1 text-center">
          {data?.transactionId || 0}
        </td>
        <td className=" ">
          <div className="space-y-1  flex justify-center">
            <TooltipWrapper
              content={GetTime(data?.timeTransaction)?.toString() || ""}
            >
              {GetDate(data?.timeTransaction)}
            </TooltipWrapper>

            {/* {data.duration && (
              <p className="text-sm font-normal">
                <span className="text-primary-700">Duration:</span>
                <span className="text-primary font-medium">
                  {" "}
                  {data.duration || 0}
                </span>
              </p>
            )} */}
          </div>
        </td>
        <td className=" text-center font-medium">{data?.description}</td>
        <td className=" text-center">
          <span className="font-medium">
            {(data?.debitAmount || 0).toFixed(2)} {statement?.account?.currency}
          </span>
        </td>
        <td className=" text-center">
          <span className="font-medium">{data?.creditAmount || 0}</span>{" "}
          {statement?.account?.currency}
        </td>
        <td className="text-primary text-center font-medium">
          {(data?.balance || 0).toFixed(2)} {statement?.account?.currency}
        </td>
      </tr>
      {/* Total Row */}
      {/* <tr className="font-medium">
        <td colSpan={4} className="border border-black px-2 py-3 text-right">
          <span className="text-primary font-medium">Total:</span>
        </td>
        <td colSpan={1} className="border border-black px-2 py-3 text-center">
          <span className="text-primary font-medium">
            {(data.balance || 0).toFixed(2)}
          </span>
        </td>
      </tr> */}
    </tbody>
  );
};

export default StatementTableBody;
