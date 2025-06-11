import { Skeleton } from "@/bikiran/components/ui/skeleton";
import React from "react";

const DocsContentBodySkeleton = () => {
  return (
    <div className="size-full flex flex-col gap-4 mt-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 h-15">
          <Skeleton className="w-76 h-7" />
          <Skeleton className="w-86 h-5" />
        </div>
        <Skeleton className="w-30 h-10" />
      </div>
      <div className="border border-primary-200 p-4 !rounded-10 min-h-50 flex flex-col gap-2">
        <Skeleton className="w-76 h-5" />
        <Skeleton className="w-80 h-5" />
        <Skeleton className="w-76 h-5" />
      </div>
    </div>
  );
};

export default DocsContentBodySkeleton;
