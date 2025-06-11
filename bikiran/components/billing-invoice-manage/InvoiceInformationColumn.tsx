"use client";
import { FC } from "react";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import InvoiceComp from "@/bikiran/shared/invoice-overview/InvoiceComp";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import InvoiceSkeletonComp from "@/bikiran/shared/invoice-overview/skeleton-comp/InvoiceSkeletonComp";
import Image from "next/image";
import editIcon from "@/bikiran/shared/invoice-overview/icon-edit.svg";
import { TInvoiceResponse } from "./invoiceManageTypes";

const InvoiceTitle: FC<{ data: TInvoiceResponse }> = ({ data }) => {
  const { openModal } = useTemplate();

  return (
    <div className="relative w-[calc(100%_+_16px)] -left-4 group rounded-10 mb-3 flex items-center print:hidden">
      <h2 className="z-0 text-primary w-full rounded-10 hover:bg-[#8080802e] text-lg font-medium text-left whitespace-nowrap text-ellipsis overflow-hidden px-4 py-[8.5px] group-hover:bg-[#8080802e]">
        {`Invoice-${data?.invoice?.id || 0}-${data?.invoice?.invoiceTitle}`}
      </h2>
      <div className="absolute top-1/2 -translate-y-1/2 left-[calc(100%_-_15px)] invisible group-hover:visible invoice-edit-btn">
        <button
          type="button"
          className="size-6 bg-error rounded-full p-1.5"
          onClick={() => openModal("update-title", data)}
        >
          <Image
            src={editIcon}
            alt="edit icon"
            width={24}
            height={24}
            className="w-full h-auto"
          />
        </button>
      </div>
    </div>
  );
};
const InvoiceInformationColumn: FC = () => {
  const { invoiceInfo, loading, reload } = useInvoiceInfo();
  const { scopes } = invoiceInfo;

  return (
    <div className="w-full p-7.5 shadow-[0_0_50px_rgba(19,15,64,.08)] rounded-20 print:shadow-none print:!p-0">
      <InvoiceTitle data={invoiceInfo} />

      <div className="[&>div]:!p-0 [&>div]:shadow-none [&>div]:!bg-transparent">
        {loading && <InvoiceSkeletonComp />}
        {!loading && invoiceInfo?.invoice?.id !== 0 && (
          <InvoiceComp data={invoiceInfo} reload={reload} scopes={scopes} />
        )}
      </div>
    </div>
  );
};

export default InvoiceInformationColumn;
