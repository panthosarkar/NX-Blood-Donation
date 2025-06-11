import { FC } from "react";
import UserSkeletonComp from "../../user-search/UserSkeletonComp";
import InvoiceInfoSkeleton from "./InvoiceInfoSkeleton";
import InvoiceToSkeleton from "./InvoiceToSkeleton";
import InvoiceTableSkeleton from "./InvoiceTableSkeleton";
import { Skeleton } from "@/bikiran/components/ui/skeleton";
import InvoiceSummerySkeleton from "./InvoiceSummerySkeleton";

const InvoiceSkeletonComp: FC = () => {
  return (
    <div className="w-full mt-5 text-gray-800 bg-white shadow-[0px_4px_70px_0px_rgba(19,15,64,0.05)] px-[25px] sm:px-5 py-6 print:!p-0 print:shadow-none">
      <h2 className="text-primary text-3xl text-center font-medium mb-5 hidden print:block">
        Invoice
      </h2>
      {/* Sending To... */}
      <div className="grid grid-cols-2 gap-10 mb-8">
        <div>
          <div className={` rounded-10 transition-colors duration-300 `}>
            <UserSkeletonComp className="px-0" />
          </div>
          <InvoiceToSkeleton />
        </div>
        <InvoiceInfoSkeleton />
      </div>

      {/* Order Summary */}
      <div className="mb-5">
        <h3 className="text-lg font-medium mb-3">Order Summary</h3>
        <table className="w-full border border-black mb-6 text-sm">
          <thead>
            <tr className="[&>th]:border [&>th]:bg-primary-100 [&>th]:border-black [&>th]:px-2 [&>th]:h-[50px] [&>th]:text-primary [&>th]:font-medium h-[50px]">
              <th className="w-[90px]">#</th>
              <th className=" text-left">Item</th>
              <th className="w-[100px] ">
                <Skeleton className="w-10 h-5" />
              </th>
              <th className="w-[80px]">Quantity</th>
              <th className="w-[80px]">
                <Skeleton className="w-10 h-5" />
              </th>
            </tr>
          </thead>
          <tbody>
            <InvoiceTableSkeleton />
            {/* Total Row */}
            <tr className="font-medium">
              <td
                colSpan={4}
                className="border border-black px-2 py-3 text-right"
              >
                <span className="text-primary font-medium">Total:</span>
              </td>
              <td colSpan={1} className="border border-black  py-3 text-center">
                <span>
                  <Skeleton className="w-16 h-5" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Summary */}
      <InvoiceSummerySkeleton />
    </div>
  );
};

export default InvoiceSkeletonComp;
