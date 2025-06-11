import { TInvoiceData, TInvoiceInfo } from "@/bik-lib/types/invoice";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import Copy from "@/bik-lib/utils/Copy";
import { GetDate } from "@/bik-lib/utils/date";
import { TInvoiceResponse } from "@/src/components/billing-invoice-manage/invoiceManageTypes";
import { icons } from "@/src/lib/icons";
import { CopyWrapper } from "@src/utils";
import Image from "next/image";
import { FC } from "react";

const InvoiceInfoRow: FC<{
  title: string;
  value: string;
}> = ({ title, value }) => {
  return (
    <div className="flex items-center justify-between text-[10px]">
      <div className="text-primary-700 font-normal">{title}:</div>
      <div className="text-primary font-medium">{value}</div>
    </div>
  );
};

const InvoiceInfo: FC<{ data: TInvoiceResponse }> = ({ data }) => {
  const { copy, isCopied } = Copy();
  const invoice: TInvoiceInfo = data?.invoice as TInvoiceInfo;
  return (
    <div className="text-sm w-full mt-2">
      <h2 className="text-primary text-xs font-medium text-left mb-2">
        Invoice Info
      </h2>
      <div className="grid grid-cols-2 items-center justify-between gap-y-1 text-[10px]">
        <div className="text-primary-700 font-normal">Invoice Number:</div>
        <div
          className="text-primary group font-medium text-end cursor-pointer flex items-center justify-end"
          onClick={() => {
            copy(invoice?.id);
          }}
        >
          {isCopied ? (
            <Image
              src={icons?.iconTick}
              alt="copy"
              width={100}
              height={100}
              sizes="100vw"
              className="size-4"
            />
          ) : (
            <Image
              src={icons?.iconCopy}
              alt="copy"
              width={100}
              height={100}
              sizes="100vw"
              className="size-4 group-hover:block hidden"
            />
          )}
          #{invoice?.id}
        </div>
      </div>
      <InvoiceInfoRow
        title="Date of Issue"
        value={GetDate(invoice?.timeIssue) || ""}
      />
      <InvoiceInfoRow
        title="Payment Due Date"
        value={GetDate(invoice?.timeDue) || ""}
      />
      <InvoiceInfoRow title="Currency" value={invoice?.localCurrency || ""} />
      <InvoiceInfoRow
        title="Status"
        value={capitalizeFirstLetter(invoice?.status.toLocaleLowerCase()) || ""}
      />
    </div>
  );
};

export default InvoiceInfo;
