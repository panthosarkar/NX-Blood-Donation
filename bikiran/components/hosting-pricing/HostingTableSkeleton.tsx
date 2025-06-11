import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const HostingTableSkeleton: FC = () => {
  const arr = Array.from({ length }, (_, i) => i);

  return arr.map((i) => (
    <tr key={i} className="even:bg-primary-50 !border-0 ">
      <td className="font-medium ">
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td className=" float-right my-2">
        <Skeleton className="size-7" />
      </td>
    </tr>
  ));
};

export default HostingTableSkeleton;
