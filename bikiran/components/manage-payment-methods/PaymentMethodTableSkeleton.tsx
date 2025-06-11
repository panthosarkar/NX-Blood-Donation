import React from "react";
import { Skeleton } from "../ui/skeleton";

const PaymentMethodTableSkeleton = () => {
  return (
    <div className="w-full h-14.5 bg-primary-50 even:!bg-primary-50 grid grid-flow-col items-center *:text-primary *:text-base *:px-2 *:font-medium table-container">
      <div className="w-[80px] !text-center">
        <Skeleton className=" h-5" />
      </div>
      <div className="w-[100px]">
        <Skeleton className=" size-8" />
      </div>
      <div className="w-[80px] text-center">
        <Skeleton className=" h-5" />
      </div>
      <div className="w-[100px] text-start">
        <Skeleton className=" h-5" />
      </div>
      <div className="w-[350px] text-start">
        <Skeleton className=" h-5" />
      </div>
      <div className="w-[200px] text-start">
        <Skeleton className=" h-5" />
      </div>
      <div className="w-[100px] text-center">
        <Skeleton className=" h-5" />
      </div>
      <div className="text-right pr-5 w-[80px]">
        <Skeleton className="size-8 float-right" />
      </div>
    </div>
  );
};
export default PaymentMethodTableSkeleton;
