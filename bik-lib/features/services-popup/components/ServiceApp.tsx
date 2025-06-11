import React from "react";
import Image from "next/image";
import Link from "next/link";
import iconDefaultApp from "./icon-default-app.svg";
import { TApp } from "@/bik-lib/types/app";
// import { icons } from "@/bikiran/lib/icons";

const ServiceApp: React.FC<{ app: TApp }> = ({ app }) => {
  return (
    <div className=" relative flex justify-end">
      {/* {"Bikiran" === app.name && (
        <div className="absolute float-left">
          <Image
            src={icons.iconTickV2}
            alt="Selected"
            width={50}
            height={50}
            priority
            className="w-full h-full object-contain"
          />
        </div>
      )} */}
      <Link
        href={app.website}
        referrerPolicy="no-referrer"
        target="_blank"
        className="w-full h-[100px]  border border-primary-100 bg-white rounded-[18px] px-4 pt-[8px] overflow-hidden flex flex-col justify-center items-center cursor-pointer "
      >
        <div className="size-[35px] sm:size-[50px] mb-1.5">
          <Image
            src={app?.logo || iconDefaultApp}
            alt={app?.name}
            width={50}
            height={50}
            priority
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-primary-700 text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {app?.name}
        </p>
      </Link>
    </div>
  );
};

export default ServiceApp;
