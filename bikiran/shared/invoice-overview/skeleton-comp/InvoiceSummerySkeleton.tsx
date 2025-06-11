import { FC } from "react";
import { Skeleton } from "@/bikiran/components/ui/skeleton";

const InvoiceSummerySkeleton: FC = () => {
  return (
    <div className="w-full max-w-sm mr-auto text-sm mb-6">
      <table className="w-full border border-black text-right">
        <thead>
          <tr>
            <th colSpan={2} className="px-2 h-8 bg-primary-100">
              <div className="flex justify-between items-center text-primary font-medium">
                <span>Payable Amount</span>
                <span>
                  <Skeleton className="w-10 h-4" />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="[&_td]:border [&_td]:border-black [&_td]:px-2 [&_td]:py-1.5 ">
          <tr>
            <td className="text-left">Total:</td>
            <td className="font-medium">
              <Skeleton className="w-[89px] h-4" />
            </td>
          </tr>
          <tr>
            <td className="text-left">VAT (Where Applicable):</td>
            <td className="font-medium">
              <Skeleton className="w-20 h-4" />
            </td>
          </tr>
          <tr>
            <td className="text-left">Paid:</td>
            <td className="font-medium">
              <Skeleton className="w-20 h-4" />
            </td>
          </tr>
          <tr>
            <td className="text-left">Payable:</td>
            <td className="font-medium">
              <Skeleton className="w-20 h-4" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceSummerySkeleton;
