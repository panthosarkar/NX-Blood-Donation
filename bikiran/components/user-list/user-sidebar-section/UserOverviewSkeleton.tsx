import React from "react";
import { Skeleton } from "../../ui/skeleton";
import InfoWrapper from "@/bik-lib/features/info-wrapper/InfoWrapper";
const UserInfoSkeleton = () => {
  return (
    <div>
      <InfoWrapper className="mt-6">
        <div>
          <Skeleton className="w-44 h-4" />
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
          </div>
        </div>
      </InfoWrapper>
    </div>
  );
};
const UserInfoTableSkeleton = () => {
  return (
    <div>
      <InfoWrapper className="mt-6">
        <div>
          <Skeleton className="w-44 h-4" />
          <div className="space-y-4 mt-4">
            <div className="">
              <Skeleton className="w-full h-10" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
              <div className="flex gap-6">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
          </div>
        </div>
      </InfoWrapper>
    </div>
  );
};

const UserOverviewSkeleton = () => {
  return (
    <div>
      <div className=" flex justify-between py-4 border-b">
        <div className="flex gap-4 ">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-2 ">
            <Skeleton className="w-44 h-4" />
            <Skeleton className="w-44 h-4" />
          </div>
        </div>
        <div>
          <Skeleton className="size-10" />
        </div>
      </div>
      <UserInfoSkeleton />
      <UserInfoTableSkeleton />
      <UserInfoTableSkeleton />
      <UserInfoTableSkeleton />
    </div>
  );
};

export default UserOverviewSkeleton;
