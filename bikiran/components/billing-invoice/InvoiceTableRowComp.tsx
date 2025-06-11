import React, { FC, useState } from "react";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { useRouter } from "next/navigation";
import { TInvoiceTableItem } from "./InvoiceListTypes";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { cn } from "@/bik-lib/utils/cn";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Checkbox } from "../ui/checkbox";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import { TooltipUserInfo } from "@bikiran/utils";
import Image from "next/image";
import StatusColor from "@/bik-lib/utils/statusColor";
import useApi from "@/bik-lib/utils/useApi";

const InvoiceTableRowComp: FC<{
  data: TInvoiceTableItem[];
  selectOne: (data: TInvoiceTableItem) => void;
  isAllSelected: boolean;
  selectedData: TInvoiceTableItem[];
}> = ({ data, selectOne, isAllSelected, selectedData }) => {
  const router = useRouter();
  const { openModal } = useTemplate();
  const [activeId, setActiveId] = useState<number>(0);

  // const { reload } = useApi();

  const handleClick = (id: number) => {
    // reload(-2);
    setActiveId(id);
    openModal("invoice-list-sidebar", id);
  };

  return data.map((item: TInvoiceTableItem) => {
    const isSelected = selectedData?.findIndex((i) => i.id === item.id) !== -1;
    return (
      <tr
        key={item.id}
        onClick={() => handleClick(item.id)}
        className={cn("", {
          "!bg-primary-200": activeId === item.id,
        })}
      >
        <td className="!font-medium" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2">
            <Checkbox
              className={`border-primary ring-0 data-[state=checked]:border-secondary  data-[state=checked]:bg-secondary data-[state=checked]:text-white disabled:bg-primary-200 disabled:border-primary-500`}
              onClick={() => selectOne(item)}
              disabled={
                selectedData?.length > 0 &&
                selectedData?.some(
                  (i) => i.localCurrency !== item.localCurrency
                )
              }
              checked={isSelected}
            />
            {item.id}
          </div>
        </td>
        <td onClick={(e) => e.stopPropagation()}>
          <TooltipUserInfo
            user={item.user}
            ImageComponent={Image}
            redirectClick={() =>
              router.push(`/user/${item?.user?.id}/overview`)
            }
          />
        </td>
        <td>
          <TooltipWrapper content={item.invoiceTitle}>
            <div className="flex flex-col gap-1 text-start">
              <span className="font-medium line-clamp-1 ">
                {item.invoiceTitle}
              </span>
              <span className="text-[13px] text-primary-500">
                {item.domain || "--------"}
              </span>
            </div>
          </TooltipWrapper>
        </td>

        <td className="text-center">
          <TooltipWrapper content={GetTime(item.timeIssue) || ""}>
            {GetDate(item.timeIssue)}
          </TooltipWrapper>
        </td>
        <td className="text-center">
          <TooltipWrapper content={GetTime(item.timeDue) || ""}>
            {GetDate(item.timeDue)}
          </TooltipWrapper>
        </td>
        <td className="text-center">
          {showCurrencySign(item.localCurrency)} {showInt(item.priceTotal)}
        </td>
        <td className="text-center">
          {capitalizeFirstLetter(
            showCurrencySign(item.localCurrency.toLowerCase())
          )}{" "}
          {showInt(item.amountPaid)}
        </td>
        <td className="text-center">
          <StatusColor status={item?.status || "---"} />
        </td>
        <td className="text-right">
          <div className="flex justify-end items-center">
            {" "}
            <InstOption>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/billing/invoice/${item.id}/update`);
                }}
              >
                Manage
              </button>
            </InstOption>
          </div>
        </td>
      </tr>
    );
  });
};

export default InvoiceTableRowComp;
