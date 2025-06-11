import React from "react";
import { Skeleton } from "../ui/skeleton";

const DomainTableSkeletonComp = () => {
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
        <Skeleton className="h-5" />
      </td>

      <td>
        <Skeleton className="h-5" />
      </td>
      <td className="">
        <div>
          <Skeleton className="size-7 " />
        </div>
      </td>
    </tr>
  );
};

export default DomainTableSkeletonComp;
