import { Skeleton } from "@/bikiran/components/ui/skeleton";
import React from "react";
import { IAppList } from "../../ManageApplicationTypes";

const ApplicationTableSkeleton = ({ rows }: { rows?: IAppList[] }) => {
  const rowsMapped = rows?.map((row, i) => i) || [1, 2];

  return (
    <ul className="table-body flex flex-col w-full">
      {rowsMapped.map((item: number) => (
        <li
          key={item}
          className="w-full h-[60px] even:!bg-primary-50 grid grid-flow-col items-center *:text-primary *:text-base *:px-2 *:font-medium "
        >
          <div className="w-[70px] flex items-center justify-center">
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="w-[100px]">
            <Skeleton className="h-5" />
          </div>
          <div className="w-[120px] flex justify-center items-center">
            <Skeleton className="size-[34px]" />
          </div>
          <div className="w-[100px]">
            <Skeleton className="h-5" />
          </div>
          <div className="w-[170px]">
            <Skeleton className="h-5 max-w-60" />
          </div>
          <div className="w-[260px] text-center">
            <Skeleton className="h-5" />
          </div>
          <div className="w-[150px] text-center">
            <Skeleton className="h-5" />
          </div>
          <div className="w-[100px] text-center">
            <Skeleton className="h-5" />
          </div>
          <div className="text-right text-white flex gap-2 justify-end w-[100px]">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ApplicationTableSkeleton;
