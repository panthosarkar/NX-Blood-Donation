import { TInvoiceData, TInvoiceInfo } from "@/bik-lib/types/invoice";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { GetDate } from "@/bik-lib/utils/date";
import { FC } from "react";
import { TStatement } from "./statementTypes";

const StatementInfoRow: FC<{
  title: string;
  value: string;
}> = ({ title, value }) => {
  return (
    <div className="flex items-center justify-between mb-1">
      <div className="text-primary-700 font-normal">{title}:</div>
      <div className="text-primary font-medium">{value}</div>
    </div>
  );
};

const StatementUserInfoComp: FC<{ data: TStatement }> = ({ data }) => {
  // const invoice: TStatement = data?.transaction as TInvoiceInfo;
  return (
    <div className="text-sm w-full">
      <h2 className="text-primary text-base md:text-lg font-medium text-left mb-2">
        Statement Info
      </h2>
      {data?.transactions &&
        data?.transactions.map((item, index) => (
          <StatementInfoRow
            key={index}
            title={item.description}
            value={item.description}
          />
        ))}
    </div>
  );
};

export default StatementUserInfoComp;
