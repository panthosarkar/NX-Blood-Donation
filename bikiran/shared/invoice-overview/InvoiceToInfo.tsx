import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TAddressBilling, TInvoiceData } from "@/bik-lib/types/invoice";
import Image from "next/image";
import { FC } from "react";
import editIcon from "./icon-edit.svg";
import { cn } from "@/bik-lib/utils/cn";
import { TInvoiceResponse } from "@/bikiran/components/billing-invoice-manage/invoiceManageTypes";

const InvoiceToInfo: FC<{
  data: TInvoiceResponse;
  editable: boolean;
}> = ({ data, editable }) => {
  const addressBilling = data?.addressBilling as TAddressBilling;
  const {
    name,
    organization,
    email,
    mobile,
    line1,
    line2,
    line3,
    country,
    state,
    city,
    zipCode,
  } = addressBilling || {};
  const { openModal } = useTemplate();
  return (
    <div
      className={cn("relative !-left-4", {
        group: editable,
      })}
    >
      <div className="text-sm flex-1 overflow-hidden py-4 px-4 group-hover:bg-[#8080802e] rounded-10">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="text-primary text-sm font-medium">To</h2>
        </div>
        <h2 className="text-primary text-xs font-medium mb-1">
          <span>
            {name || "-----"}
            {organization ? `(${organization})` : "----"}
          </span>
        </h2>
        <div className="text-primary-700 text-[10px] font-normal">
          <div className="overflow-ellipsis overflow-hidden line-clamp-2">
            <p className="text-[10px]">
              {[line1, line2, line3, city, state, zipCode, country]
                .filter((x) => !!x)
                .join(", ") || "----"}
            </p>
          </div>
          <div className="whitespace-nowrap">
            <p className="font-medium overflow-ellipsis overflow-hidden text-[10px]">
              Contact: {mobile || "----"}, {email || "----"}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-[calc(50%_-_10px)] left-[calc(100%_-_15px)] invisible group-hover:visible">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="size-6 -mr-2 bg-error rounded-full p-1.5"
            onClick={() => openModal("address-modify", data)}
          >
            <Image
              src={editIcon}
              alt="edit icon"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceToInfo;
