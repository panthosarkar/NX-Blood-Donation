import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const SupportSkeletonBody: FC = () => {
  return (
    <section className="max-w-[900px] w-full mx-auto flex flex-col h-[calc(100%-90px)] relative">
      <div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="pt-5 pb-8  mb-5">
            <div className="flex items-center gap-2">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            <div className="pl-12 pt-5 space-y-1">
              {[1, 2, 3].map((el) => (
                <Skeleton key={el} className="h-2.5 w-1/2" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex items-center justify-between gap-10 absolute bottom-10">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="flex-1 h-10 rounded-30" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
    </section>
  );
};

export default SupportSkeletonBody;
