import { Skeleton } from "@/bikiran/components/ui/skeleton";
import React from "react";

const InvoiceToSkeleton = () => {
  return (
    <div className="">
      <div className="flex items-center gap-1 mb-2 ">
        <h2 className="text-primary text-xl md:text-xl pt-8  font-medium">
          To
        </h2>
      </div>
      <h2 className="">
        <span className="flex gap-2 mt-4">
          <Skeleton className="w-[150px] h-3" />
          (<Skeleton className="w-[50px] h-3" />)
        </span>
      </h2>
      <div className=" space-y-[2px]">
        <span className="space-y-1">
          <Skeleton className="w-[200px] h-3" />
          <Skeleton className="w-[200px] h-3" />
          <Skeleton className="w-[200px] h-3" />
        </span>
      </div>
      <div className="whitespace-nowrap ">
        <span className="flex justify-start items-center mt-1.5 gap-2 ">
          <Skeleton className="w-[150px] h-3" />
          <Skeleton className="w-[100px] h-3" />
        </span>
      </div>
    </div>
  );
};

export default InvoiceToSkeleton;
