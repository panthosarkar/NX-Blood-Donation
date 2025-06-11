import React from "react";
import { Skeleton } from "../ui/skeleton";

const CurrencyConfSkeletonComp = () => {
  return (
    <tr>
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
        <div>
          <Skeleton className="size-7" />
        </div>
      </td>
    </tr>
  );
};
export default CurrencyConfSkeletonComp;
