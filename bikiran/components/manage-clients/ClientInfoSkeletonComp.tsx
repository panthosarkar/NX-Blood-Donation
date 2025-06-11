import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const ClientInfoSkeletonComp: FC = () => {
  return (
    <div className="h-14.5 grid-flow-col items-center grid gap-3 even:!bg-primary-50 ">
      <div className="w-[100px]">
        <Skeleton className="h-5 " />
      </div>
      <div className="w-[200px] flex justify-center items-center">
        <Skeleton className="size-10 rounded-full" />
      </div>
      <div className="2xl:w-[300px] w-[200px]">
        <Skeleton className="h-5 " />
      </div>
      <div className="w-[200px]">
        <Skeleton className="h-5 " />
      </div>
      <div className="w-[150px]">
        <Skeleton className="h-5 " />
      </div>
      <div className=" w-[100px]">
        <Skeleton className="h-5" />
      </div>
      <div className="w-[50px] flex justify-center items-center">
        <Skeleton className="size-8 " />
      </div>
    </div>
  );
};

export default ClientInfoSkeletonComp;
