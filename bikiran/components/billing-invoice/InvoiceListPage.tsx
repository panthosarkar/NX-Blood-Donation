"use client";
import InvoiceListProvider, {
  useInvoiceList,
} from "./context/InvoiceListProvider";
import { FC } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { CustomSidebar, Pagination } from "@bikiran/utils";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import checkModal from "@/bik-lib/utils/checkModal";
import InvoiceTableSection from "./InvoiceTableSection";
import InvoiceSidebarSection from "./InvoiceSidebarSection";
import InvoiceListHeaderSection from "./InvoiceListHeaderSection";

const InvoiceListTableComp: FC = () => {
  const { invoices, loading, pagination } = useInvoiceList();

  return (
    <div>
      <InvoiceTableSection invoices={invoices} />
      <Pagination
        data={pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || invoices?.length === 0}
      />
    </div>
  );
};

const InvoiceListPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { modalData } = useTemplate();

  checkModal("create-invoice");

  return (
    <InvoiceListProvider query={query}>
      <div className="admin-section">
        <InvoiceListHeaderSection />
        <InvoiceListTableComp />
      </div>

      <CustomSidebar
        showType="invoice-list-sidebar"
        usePathname={usePathname}
        useTemplate={useTemplate}
      >
        <InvoiceSidebarSection invoiceId={modalData} />
      </CustomSidebar>
    </InvoiceListProvider>
  );
};

export default InvoiceListPage;
