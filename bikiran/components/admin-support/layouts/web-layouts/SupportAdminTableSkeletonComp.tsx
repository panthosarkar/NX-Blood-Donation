import React from "react";
import { Skeleton } from "../../../ui/skeleton";

const SupportAdminTableSkeletonComp = () => {
  return (
    <tr className="even:bg-primary-50 !border-0">
      <td className="font-medium rounded-tl-8 rounded-bl-8">
        <Skeleton className="h-5" />
      </td>
      <td>
        <div className="flex justify-center items-center">
          <Skeleton className="size-8" />
        </div>
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
    </tr>
  );
};

export default SupportAdminTableSkeletonComp;
