import { Skeleton } from "@/src/components/ui/skeleton";
import { FC } from "react";

const InvoiceTableSkeleton: FC = () => {
  return (
    <tr className="[&>td]:border [&>td]:border-black [&>td]:px-2 [&>td]:py-2">
      <td className="border border-black px-2 py-1 ">
        <Skeleton className="w-18 h-5" />
      </td>
      <td className="">
        <div className="space-y-1">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-40 h-5" />
        </div>
      </td>
      <td>
        <div className="space-y-1">
          <Skeleton className="w-12 h-5" />
          <Skeleton className="w-12 h-5" />
        </div>
      </td>
      <td className="">
        <span className="space-y-1">
          <Skeleton className="w-10 h-5" />
          {/* <Skeleton className="w-10 h-5" /> */}
        </span>
      </td>
      <td className=" ">
        <Skeleton className="w-15 h-5" />
      </td>
    </tr>
  );
};

export default InvoiceTableSkeleton;
