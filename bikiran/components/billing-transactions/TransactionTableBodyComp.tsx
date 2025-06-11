import React from "react";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { TTransaction } from "./TransactionTypes";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import StatusColor from "@/bik-lib/utils/statusColor";

interface IProps {
  data: TTransaction[];
}
const TransactionTableBodyComp = ({ data }: IProps) => {
  return (
    <tbody>
      {Array.isArray(data) &&
        data.map((item, index) => (
          <tr key={index} className="even:bg-primary-50 !border-0">
            <td className=" text-center">{item.transactionId}</td>
            <td className="text-center">{item.invoiceId}</td>
            <td className="text-center">{item.type}</td>
            <td>{item.description || "--"}</td>
            {/* <td className="text-center">
              {showCurrencySign(item.currency)} {showInt(item.debitAmount)}
            </td>
            <td className="text-center">
              {showCurrencySign(item.currency)} {showInt(item.creditAmount)}
            </td> */}
            <td className="text-start">
              <div className="flex justify-between items-center">
                <span className="">
                  {showCurrencySign(item.currency)}{" "}
                  {showInt(item?.debitAmount) || "0.00"}
                </span>
                <span className="text-center">|</span>
                <span>
                  {showCurrencySign(item.currency)}{" "}
                  {showInt(item?.creditAmount) || "0.00"}
                </span>
              </div>
            </td>
            <td className="text-center">
              {showCurrencySign(item.currency)} {showInt(item.balance)}
            </td>

            <td className="text-center">
              <TooltipWrapper content={String(GetTime(item.timeCreated) || 0)}>
                {GetDate(item.timeCreated)}
              </TooltipWrapper>
            </td>
            <td className="text-center">
              <StatusColor status={item?.status || "---"} />
            </td>
            <td>
              <InstOption disabled>
                <button type="button" onClick={() => {}}>
                  Delete
                </button>
                <button type="button" onClick={() => {}}>
                  Details
                </button>
              </InstOption>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default TransactionTableBodyComp;
