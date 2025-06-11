import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const HostingListSkeletonComp: FC = () => {
  return (
    <tr className="h-[60px] [&>th]:text-left  [&>tr]:pl-2">
      <td>
        <Skeleton className="w-[75px] h-5" />
      </td>
      <td className="">
        <Skeleton className="size-9 rounded-full" />
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
      <td>
        <div className="flex justify-end">
          <Skeleton className="w-8 h-8" />
        </div>
      </td>
    </tr>
  );
};
export default HostingListSkeletonComp;
