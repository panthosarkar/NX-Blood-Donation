import React, { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const BankManagementSkeletonComp: FC = () => {
  const arr = Array.from({ length }, (_, i) => i);

  return arr.map((i) => (
    <tr key={i} className="h-[60px] [&>th]:text-left  [&>tr]:pl-2">
      <td>
        <Skeleton className="w-full h-5" />
      </td>
      <td>
        <Skeleton className="w-full h-5" />
      </td>
      <td>
        <Skeleton className="w-full h-5" />
      </td>
      <td>
        <Skeleton className="w-full h-5" />
      </td>
      <td>
        <Skeleton className="w-full h-5" />
      </td>
      <td>
        <Skeleton className="w-full h-5" />
      </td>
      <td>
        <Skeleton className="w-full h-5" />
      </td>

      <td>
        <Skeleton className="w-8 h-8 float-right" />
      </td>
    </tr>
  ));
};
export default BankManagementSkeletonComp;
