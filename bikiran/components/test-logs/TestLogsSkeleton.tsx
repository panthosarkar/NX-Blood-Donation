import React from "react";
import { Skeleton } from "../ui/skeleton";

const TestLogsSkeleton = () => {
  const arr = Array.from({ length }, (_, i) => i);

  return arr.map((i) => (
    <tr key={i} className="h-[60px] [&>th]:text-left  [&>tr]:pl-2">
      <td>
        <Skeleton className="h-5 w-[60px]" />
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
  ));
};

export default TestLogsSkeleton;
