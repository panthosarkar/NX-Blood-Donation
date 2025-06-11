import React from "react";
import { Skeleton } from "../ui/skeleton";

const UserActivitySkeleton = () => {
  return (
    <tr className="h-[60px] [&>th]:text-left  [&>tr]:pl-2">
      <td>
        <Skeleton className="w-[75px] h-5" />
      </td>
      <td>
        <div className="flex justify-center items-center">
          <Skeleton className="size-10 rounded-full" />
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
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <div className="flex justify-end">
          <Skeleton className="w-8 h-8" />
        </div>
      </td>
    </tr>
  );
};

export default UserActivitySkeleton;
