import { FC } from "react";
import { cn } from "@/bik-lib/utils/cn";

type TTableProps = {
  arr: number[];
  tds: string[];
  isTableHasAction: boolean;
};

const Skeleton: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className={cn("animate-pulse rounded-md bg-primary-100", className)} />
  );
};

const TableSkeleton: FC<{ show: boolean; data: TTableProps }> = ({
  show,
  data,
}) => {
  if (!show) return null;
  return data?.arr?.map((i) => (
    <tr key={i}>
      {data?.tds?.map((el) => (
        <td key={el}>
          <Skeleton className="w-full h-5" />
        </td>
      ))}

      {data?.isTableHasAction && (
        <td>
          <div className="flex justify-end">
            <Skeleton className="size-[31px]" />
          </div>
        </td>
      )}
    </tr>
  ));
};

export default TableSkeleton;
