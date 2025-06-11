import React from "react";
import { Skeleton } from "../ui/skeleton";

const DomainDeletedListSkeleton = () => {
  return (
    <tr className="h-[60px] [&>th]:text-left  [&>tr]:pl-2">
      <td>
        <Skeleton className="w-[75px] h-5" />
      </td>
      <td className="">
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
    </tr>
  );
};

export default DomainDeletedListSkeleton;
