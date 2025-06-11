import { cn } from "@/bik-lib/utils/cn";
import { FC } from "react";

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

const MobileSkeleton: FC<{
  show: boolean;
  data: TTableProps;
}> = ({ show, data }) => {
  if (!show) return null;
  return data?.arr?.map((i) => (
    <div key={i} className="p-4 border rounded-2xl shadow-md mb-4 bg-white">
      {data?.tds?.map((el) => (
        <div
          key={el}
          className="flex items-center justify-between gap-2 5 mb-3"
        >
          <Skeleton className="w-1/6 h-4" />
          <Skeleton className="w-3/12 h-4" />
        </div>
      ))}
    </div>
  ));
};

export default MobileSkeleton;
