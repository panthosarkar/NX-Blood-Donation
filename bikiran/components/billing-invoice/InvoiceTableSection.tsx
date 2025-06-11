"use client";
import { FC, useState, useMemo } from "react";
import { useInvoiceList } from "./context/InvoiceListProvider";
import { TInvoiceTableItem } from "./InvoiceListTypes";
import InvoiceTableRowComp from "./InvoiceTableRowComp";
import InvoiceTableRowSkeletonComp from "./InvoiceTableRowSkeletonComp";
import { Checkbox } from "../ui/checkbox";
import InvoiceCustomSummaryComp from "./InvoiceCustomSummaryComp";

const InvoiceTableSection: FC<{ invoices: TInvoiceTableItem[] }> = ({
  invoices,
}) => {
  const { loading } = useInvoiceList();
  const [selectedData, setSelectedData] = useState<TInvoiceTableItem[]>([]);

  // Memoize the currency-based grouping to avoid recalculating
  const invoicesByCurrency = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        const currency = invoice.localCurrency || "USD"; // Default to USD if undefined
        acc[currency] = acc[currency] || [];
        acc[currency].push(invoice);
        return acc;
      },
      {} as Record<string, TInvoiceTableItem[]>
    );
  }, [invoices]);

  // Check if all invoices of the selected currency are selected
  const isAllSelected = useMemo(() => {
    if (selectedData.length === 0) return false;
    const currency = selectedData[0]?.localCurrency || "USD";
    const invoicesInCurrency = invoicesByCurrency[currency] || [];
    return (
      selectedData.length === invoicesInCurrency.length &&
      invoicesInCurrency.length > 0
    );
  }, [selectedData, invoicesByCurrency]);

  // Select or deselect all invoices of the same currency
  const selectAll = () => {
    if (isAllSelected) {
      setSelectedData([]); // Deselect all
    } else {
      const currency = selectedData[0]?.localCurrency || "USD"; // Use selected currency or default to USD
      setSelectedData(invoicesByCurrency[currency] || []);
    }
  };

  // Select or deselect a single invoice
  const selectOne = (data: TInvoiceTableItem) => {
    setSelectedData((prev) => {
      const isSelected = prev.some((item) => item.id === data.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== data.id); // Deselect
      }
      // Ensure only same-currency invoices are selected
      const currency = data.localCurrency || "USD";
      const newSelection = [
        ...prev.filter((item) => item.localCurrency === currency),
        data,
      ];
      return newSelection;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <table className="table-container">
        <thead>
          <tr>
            <th className="w-[130px]">
              <div className="flex items-center gap-2" onClick={selectAll}>
                <Checkbox
                  className="border-primary ring-0 data-[state=checked]:border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-white"
                  checked={!loading && isAllSelected}
                  disabled={loading || invoices.length === 0}
                />
                Invoice ID
              </div>
            </th>
            <th className="w-14 text-center">User</th>
            <th className="text-left">Invoice Title</th>
            <th className="w-[130px] text-center">Issue Date</th>
            <th className="w-[130px] text-center">Due Date</th>
            <th className="w-[150px]">Bill Amount</th>
            <th className="w-[150px]">Paid Amount</th>
            <th className="w-[120px] text-center">Status</th>
            <th className="w-[80px] text-right">#</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: invoices?.length || 2 }).map((_, i) => (
              <InvoiceTableRowSkeletonComp key={i} />
            ))
          ) : invoices.length === 0 ? (
            <tr className="hover:!bg-transparent">
              <td colSpan={9} className="text-center font-medium !text-xl h-40">
                No Invoice Found
              </td>
            </tr>
          ) : (
            <InvoiceTableRowComp
              data={invoices}
              selectOne={selectOne}
              selectedData={selectedData}
              isAllSelected={isAllSelected}
            />
          )}
        </tbody>
      </table>
      <InvoiceCustomSummaryComp data={selectedData} />
    </div>
  );
};

export default InvoiceTableSection;
