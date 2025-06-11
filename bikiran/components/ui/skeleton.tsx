import { cn } from "@/bik-lib/utils/cn";
import React from "react";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary-100", className)}
      {...props}
    />
  );
};

export { Skeleton };
