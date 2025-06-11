import React from "react";
import HeaderLeftColSkeleton from "./HeaderLeftColSkeleton";
import Image from "next/image";

import Link from "next/link";
import { icons } from "@/bikiran/lib/icons";
import { GetDate, GetTime } from "@/bik-lib/utils/date";

// Application info page's header.
const HeaderLeftCol = ({ data }: any) => {
  if (!data) {
    return <HeaderLeftColSkeleton />;
  }
  return (
    <div className="flex gap-5 group/inner-header items-center">
      <div className="size-18 rounded-20 overflow-hidden border border-primary-200">
        <Image
          src={data?.application?.logoUrl || icons.iconDefaultApp}
          alt={data?.application?.website || "--"}
          width={100}
          height={100}
          className="size-full inline-block border-none"
        />
      </div>
      <div className="website-info_header--content">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-primary-900">
            {data?.application?.title}
          </h1>
          <span className="text-sm font-medium text-secondary-50 bg-[#007AFF] rounded-20 px-2.5 py-[3px]">
            @{data?.application?.uniqueName}
          </span>

          <Link
            href={data?.application?.websiteUrl || ""}
            target="_blank"
            rel="noopener noreferrer"
            className="transition duration-200 opacity-0 invisible group-hover/inner-header:opacity-100 group-hover/inner-header:visible"
          >
            <Image
              src={icons.iconLink}
              alt="Website"
              width={20}
              height={20}
            />
          </Link>
        </div>
        <div className="text-base text-primary-500">
          {GetDate(data?.application?.timeCreated)}{" "}
          {GetTime(data?.application?.timeCreated)}
        </div>
      </div>
    </div>
  );
};

export default HeaderLeftCol;
