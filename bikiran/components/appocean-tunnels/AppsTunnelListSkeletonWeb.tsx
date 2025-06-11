import React from "react";
import { Skeleton } from "../ui/skeleton";
const AppsTunnelListSkeletonWeb = () => {
  const arr = Array.from({ length }, (_, i) => i);

  return arr.map((i) => (
    <tr key={i} className="h-[60px] [&>th]:text-left [&>tr]:pl-2">
      <td className="w-[98px]">
        <Skeleton className="h-5" />
      </td>
      <td className=" flex items-center my-2 gap-4">
        <Skeleton className="size-9 rounded-full" />
        <div>
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-40 h-5 mt-1" />
        </div>
      </td>
      <td className="">
        <Skeleton className=" h-5" />
      </td>
      <td>
        <Skeleton className=" h-5" />
      </td>
      <td>
        <Skeleton className=" h-5" />
      </td>
      <td>
        <Skeleton className=" h-5" />
      </td>
      <td>
        <Skeleton className=" h-5" />
      </td>
      <td>
        <div className="flex justify-end">
          <Skeleton className="size-7" />
        </div>
      </td>
    </tr>
  ));
};
export default AppsTunnelListSkeletonWeb;
