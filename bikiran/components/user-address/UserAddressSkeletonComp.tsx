import React, { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const UserAddressSkeletonComp: FC = () => {
  const arr = Array.from({ length }, (_, i) => i);

  return arr.map((i) => (
    <tr key={i} className="h-[60px] [&>th]:text-left [&>tr]:pl-2">
      <td>
        <Skeleton className=" h-5" />
      </td>
      <td className=" flex items-center my-2 gap-4">
        <Skeleton className="size-9 rounded-full" />
        <div>
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-40 h-5 mt-1" />
        </div>
      </td>
      <td>
        <Skeleton className="w-30 h-5" />
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
        <Skeleton className="size-8 float-right" />
      </td>
    </tr>
  ));
};
export default UserAddressSkeletonComp;
