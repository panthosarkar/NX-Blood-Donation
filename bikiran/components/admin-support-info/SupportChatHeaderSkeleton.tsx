import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const SupportChatHeaderSkeleton: FC = () => {
  return (
    <section className="container h-[90px] ">
      <div className="w-full flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Section with Dynamic Layout */}
      {/* <SupportChatBodySection /> */}
    </section>
  );
};

export default SupportChatHeaderSkeleton;
