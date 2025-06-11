import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const EnConfigTableSkeleton: FC<{
  show: boolean;
  length: number;
}> = ({ show = false, length = 3 }) => {
  const placeholderArr = Array.from({ length: length }).map((_, i) => i);

  if (!show) return null;
  return placeholderArr.map((i) => (
    <tr key={i}>
      <td className="">
        <Skeleton className="w-full h-5" />
      </td>
      <td className="font-medium text-left !pl-4">
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
        <div className="flex justify-end">
          <Skeleton className="size-[31px]" />
        </div>
      </td>
    </tr>
  ));
};

export default EnConfigTableSkeleton;
