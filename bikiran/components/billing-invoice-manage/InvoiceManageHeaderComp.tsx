"use client";
import { Button } from "@bikiran/button";
import { FC, useRef } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/bik-lib/utils/cn";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";

const BackListButton: FC<{ className: string }> = ({ className }) => {
  return (
    <Link
      href="/billing/invoice"
      className={cn("flex items-center gap-2.5 lg:gap-4", className)}
    >
      <div className="w-4 lg:w-5">
        <Image
          src={icons?.iconRightArrow}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </Link>
  );
};

const InvoiceSearchField: FC = () => {
  const ref = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { id } = useParams();

  const handleValue = () => {
    if (ref?.current) {
      const value = ref?.current?.value?.trim();
      if (value?.length > 0) {
        router.push(`/billing/invoice/${value}/update`);
      }
    }
  };

  return (
    <input
      ref={ref}
      type="text"
      name="invoiceId"
      onChange={() => {}}
      onBlur={handleValue}
      onKeyDown={handleValue}
      defaultValue={typeof id === "string" ? id : ""}
      placeholder={"Type Invoice ID..."}
      className="border border-primary-300 rounded-10 h-10 focus:outline-none px-4 placeholder:text-sm focus:border-secondary"
    />
  );
};

const InvoiceManageHeaderComp: FC = () => {
  const { reload, loading, invoiceInfo } = useInvoiceInfo();

  const { openModal } = useTemplate();

  return (
    <section className="flex flex-wrap items-center justify-between gap-2.5 mb-7.5 print:hidden">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2.5 lg:gap-4">
          <BackListButton className="" />
          <h2 className="text-primary text-2xl font-medium  whitespace-nowrap">
            Update Invoice:
          </h2>
        </div>
        <InvoiceSearchField />
      </div>

      <div className="flex items-center gap-2">
        <ButtonRefresh
          className="size-10"
          onClick={() => reload()}
          disabled={loading || invoiceInfo?.invoice?.id === 0}
        />
        <Button
          type="button"
          variant="blue"
          className="px-4 h-10"
          onClick={() => openModal("duplicate-product")}
          disabled={loading || invoiceInfo?.invoice?.id === 0}
        >
          Duplicate
        </Button>
        <Button
          variant="secondary"
          className="px-4 h-10"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.print();
            }
          }}
          disabled={loading || invoiceInfo?.invoice?.id === 0}
        >
          Print Invoice
        </Button>
      </div>
    </section>
  );
};

export default InvoiceManageHeaderComp;
