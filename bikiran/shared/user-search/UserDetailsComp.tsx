import React from "react";
import { icons } from "@/bikiran/lib/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/bikiran/components/ui/avatar";
import { cn } from "@/bik-lib/utils/cn";

const UserDetailsComp = ({
  data,
  className,
}: {
  data: any;
  className?: any;
}) => {
  return (
    <div className=" flex flex-col justify-between items-start overflow-y-auto">
      <div
        className={cn(
          `flex items-center gap-[14px] py-3 px-3 w-full`,
          className
        )}
      >
        <div className="size-10 overflow-hidden">
          <Avatar className="relative !size-full mb-3 group">
            <AvatarImage src={data?.photoUrl || icons.iconBikLogo} />
            <AvatarFallback className="uppercase bg-secondary-300">
              X
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col">
          <div className="full-name text-primary text-start text-base font-medium">
            {data?.displayName}
          </div>
          <div className="full-name text-primary-700  text-start text-sm font-normal">
            {data?.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsComp;
