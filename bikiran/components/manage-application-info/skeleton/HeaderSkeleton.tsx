import { Skeleton } from "../../ui/skeleton";
import React from "react";

const HeaderSkeleton = () => {
  return (
    <div className="flex gap-4">
      <Skeleton className="size-25 rounded-20 overflow-hidden" />
      <div className="website-info_header--content space-y-1">
        <Skeleton className="h-8 w-60 text-2xl font-semibold text-primary-900 uppercase" />
        <Skeleton className="h-6 w-50 text-base font-medium text-primary-900 lowercase" />
        <Skeleton className="h-5 w-50 text-sm text-primary-500" />
        <Skeleton className="h-5 w-50 text-sm text-primary-500" />
      </div>
    </div>
  );
};

export default HeaderSkeleton;
