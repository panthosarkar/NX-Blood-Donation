import React from "react";
import { Skeleton } from "../ui/skeleton";

const InvoiceTableRowSkeletonComp = () => {
  return (
    <tr>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="size-10 rounded-full" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <div className="flex justify-end items-center">
          <Skeleton className="size-8" />
        </div>
      </td>
    </tr>
  );
};

export default InvoiceTableRowSkeletonComp;
