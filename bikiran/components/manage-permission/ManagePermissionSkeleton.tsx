import React from "react";
import { Skeleton } from "../ui/skeleton";

const ManagePermissionSkeleton = () => {
  const arr = Array.from({ length }, (_, i) => i);
  return arr.map((i) => (
    <tr key={i} className="h-[60px]">
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
        <Skeleton className=" h-5" />
      </td>
    </tr>
  ));
};

export default ManagePermissionSkeleton;
