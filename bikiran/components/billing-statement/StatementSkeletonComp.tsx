import React from "react";
import { Skeleton } from "../ui/skeleton";

const StatementSkeletonComp = () => {
  const arr = Array.from({ length }, (_, i) => i);

  return arr.map((i) => (
    <tbody key={i}>
      <tr className="[&>td]:border h-9 [&>td]:border-black [&>td]:px-2 [&>td]:py-2">
        <td className="border border-black px-2 py-1 text-center">
          <Skeleton className="h-4" />
        </td>
        <td className="">
          <Skeleton className="h-4" />
        </td>
        <td className=" text-center font-medium">
          <Skeleton className="h-4" />
        </td>
        <td className=" text-center">
          <Skeleton className="h-4" />
        </td>
        <td className=" text-center">
          <Skeleton className="h-4" />
        </td>
        <td className="text-primary text-center font-medium">
          <Skeleton className="h-4" />
        </td>
      </tr>
    </tbody>
  ));
};

export default StatementSkeletonComp;
