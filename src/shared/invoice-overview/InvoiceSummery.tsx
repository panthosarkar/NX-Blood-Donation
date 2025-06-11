import { FC } from "react";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { round } from "@/bik-lib/utils/math";
import {
  TInvoiceCalc,
  TInvoiceResponse,
} from "@/src/components/billing-invoice-manage/invoiceManageTypes";

const InvoiceSummery: FC<{ data: TInvoiceResponse }> = ({ data }) => {
  const { invoice, invoiceCalc } = data;

  const discountPrice = invoiceCalc?.totalPrice - invoiceCalc?.totalPriceOffer;

  return (
    <div className="w-full max-w-[330px] mr-auto text-sm mb-6 print:mb-0 ">
      <table className="w-full border border-black text-right text-[10px]">
        <thead>
          <tr>
            <th colSpan={2} className="px-2 h-8 bg-primary-100">
              <div className="flex justify-between items-center text-primary font-medium">
                <span>Payable Amount</span>
                <span>({invoice?.localCurrency || ""})</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="[&_td]:border [&_td]:border-black [&_td]:px-2 [&_td]:py-1.5 ">
          <tr>
            <td className="text-left">Total:</td>
            <td className="font-medium">
              <span>
                {showCurrencySign(invoice?.localCurrency)}{" "}
                {showInt(invoiceCalc?.totalPrice || 0)}
              </span>
            </td>
          </tr>
          {discountPrice > 0 && (
            <tr>
              <td className="text-left">Discount:</td>
              <td className="font-medium">
                <span>
                  (-) {showCurrencySign(invoice?.localCurrency)}{" "}
                  {showInt(discountPrice)}
                </span>
              </td>
            </tr>
          )}
          {invoiceCalc?.totalVat > 0 && (
            <tr>
              <td className="text-left">VAT (Where Applicable):</td>
              <td className="font-medium">
                <span>(+) {showInt(invoiceCalc?.totalVat || 0)}</span>
              </td>
            </tr>
          )}
          <tr>
            <td className="text-left">Paid:</td>
            <td className="font-medium">
              <span>
                (-) {showCurrencySign(invoice?.localCurrency)}{" "}
                {showInt(invoiceCalc?.totalPaid || 0)}
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-left">Payable:</td>
            <td className="font-medium">
              <span>
                {showCurrencySign(invoice?.localCurrency)}{" "}
                {showInt(round(invoiceCalc?.totalDue) || 0)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceSummery;
