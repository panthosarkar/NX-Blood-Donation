import {
  TInvoiceData,
  TInvoiceInfo,
  TInvoiceProduct,
} from "@/bik-lib/types/invoice";
import { FC } from "react";
import DomainRow from "./DomainRow";
import HostingRow from "./HostingRow";
import { assetKeys } from "@/bik-lib/lib/assets";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import {
  TInvoiceItem,
  TInvoiceResponse,
} from "@/bikiran/components/billing-invoice-manage/invoiceManageTypes";

const InvoiceTableBody: FC<{
  data: TInvoiceResponse;
  editable: boolean;
  reload?: () => void;
}> = ({ data, editable, reload }) => {
  const { invoice, invoiceCalc } = data;
  // const invoice: TInvoiceInfo = data?.invoice;
  const products: TInvoiceItem[] = data.items || [];

  return (
    <tbody>
      {products.map((item: TInvoiceItem, index: number) => {
        if (item?.assetKey === assetKeys.hosting) {
          return (
            <HostingRow
              key={item.id}
              index={index}
              data={item}
              editable={editable}
              invoice={invoice}
              reload={reload}
            />
          );
        }
        return (
          <DomainRow
            key={item.id}
            index={index}
            data={item}
            editable={editable}
            invoice={invoice}
            reload={reload}
          />
        );
      })}
      {/* Total Row */}
      <tr className="font-medium">
        <td colSpan={4} className="border border-black px-2 py-3 text-right">
          <span className="text-primary font-medium text-[11px]">Total:</span>
        </td>
        <td className="border border-black px-2 py-3 text-end text-[10px]">
          <span className="text-primary font-medium">
            {/* {showCurrencySign(invoice?.localCurrency)}{" "} */}
            {showInt(invoiceCalc?.totalPrice)}
          </span>
        </td>
        <td className="border border-black px-2 py-3 text-end text-[10px]">
          <span className="text-primary font-medium">
            {/* {showCurrencySign(invoice?.localCurrency)}{" "} */}
            {showInt(invoiceCalc?.totalPriceOffer)}
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default InvoiceTableBody;
