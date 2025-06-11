"use client";

import React, { FC } from "react";
import { useGatewayTransaction } from "./context/GatewayTransactionProvider";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import StatusColor from "@/bik-lib/utils/statusColor";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";

const GatewayTransactionTableSection: FC = () => {
  const { reFetching, gatewayTransaction } = useGatewayTransaction();

  return (
    <TableWrapper
      headers={[
        "ID + !w-[100px] !text-center",
        "Invoice ID + w-[100px]",
        "Project ID + w-[200px]",
        "Gateway ID + w-[200px]",
        "Transaction Amount + w-[220px]",
        "Time Created + w-[220px]",
        "Status + w-[80px]",
        "# + w-[50px] text-right",
      ]}
      loading={reFetching}
      notFoundText="No transaction found"
    >
      {Array.isArray(gatewayTransaction) &&
        gatewayTransaction?.map((item, index) => (
          <tr key={index}>
            <td className="text-center">{item.id}</td>
            <td className="text-center">{item.invoiceId}</td>
            <td className="text-center">{item.projectId}</td>
            <td className="text-center">{item.gatewayId}</td>
            <td className=" text-center">
              {showCurrencySign(item.transactionCurrency)}
              {showInt(item.transactionAmount)}
            </td>
            <td className="text-center">
              <TooltipWrapper
                content={GetTime(item.timeCreated)?.toString() || " "}
              >
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
    </TableWrapper>
  );
};

export default GatewayTransactionTableSection;
