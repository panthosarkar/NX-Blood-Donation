import React from "react";
import { Skeleton } from "@/bikiran/components/ui/skeleton";

const DocsMenuTableSkeleton = () => {
  return (
    <tbody>
      {[1, 2].map((i: number) => (
        <tr key={i} className="hover:!bg-transparent">
          <td>
            <Skeleton className="h-4 w-5/6" />
          </td>
          <td>
            <Skeleton className="h-4 w-5/6" />
          </td>
          <td>
            <Skeleton className="h-4 w-5/6" />
          </td>
          <td>
            <Skeleton className="h-4 w-5/6" />
          </td>
          <td>
            <Skeleton className="h-4 w-5/6" />
          </td>
          <td>
            <Skeleton className="h-4 w-5/6" />
          </td>
          <td>
            <Skeleton className="h-4 w-5/6" />
          </td>
          <td>
            <Skeleton className="h-4 w-5/6" />
          </td>
          <td>
            <div className="flex items-center justify-end gap-2">
              <Skeleton className="size-8" />
              <Skeleton className="size-8" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default DocsMenuTableSkeleton;
