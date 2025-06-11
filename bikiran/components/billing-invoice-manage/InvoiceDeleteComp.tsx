import { FC } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
const InvoiceDeleteComp: FC<{ invoiceId: number }> = ({ invoiceId }) => {
  const { invoiceInfo } = useInvoiceInfo();
  const { invoice, invoiceCalc } = invoiceInfo;
  const { openModal } = useTemplate();

  const checkAvailable =
    invoiceCalc?.totalPaid === 0 && invoiceInfo?.items?.length === 0;

  return (
    <div className="invoice-action-cont bg-red-100 border border-red-300 p-4 rounded-lg shadow-md">
      <h3 className="text-red-500 text-xl font-medium">Delete Invoice</h3>
      <p className="text-red-500 mt-2">
        Invoice can only be deleted if the paid amount is zero and no products
        are added.
      </p>

      <div className="flex gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded-lg transition ${
            checkAvailable
              ? "bg-red-500 text-white hover:bg-red-700"
              : "bg-red-300 text-red-700 cursor-not-allowed"
          }`}
          disabled={!checkAvailable}
          onClick={() => openModal("delete-invoice")}
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
};

export default InvoiceDeleteComp;
