"use client";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useApplicationInfo } from "../ApplicationInfoProvider";
import HeaderSkeleton from "../skeleton/HeaderSkeleton";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { icons } from "@/bikiran/lib/icons";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import { Button } from "@bikiran/button";
type Props = {
  data: {
    logoUrl: string;
    website: string;
    title: string;
    uniqueName: string;
    timeCreated: number;
    websiteUrl: string;
  };
};

// Application info page's header.
const HeaderLeftCol: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <HeaderSkeleton />;
  }
  return (
    <div className="flex gap-5 group/inner-header">
      <div className="size-18 rounded-20 overflow-hidden border border-primary-200">
        <Image
          src={data?.logoUrl || icons.iconDefaultApp}
          alt={data?.website || "--"}
          width={100}
          height={100}
          className="size-full inline-block border-none"
        />
      </div>
      <div className="website-info_header--content">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-primary-900">
            {data?.title}
          </h1>
          <span className="text-sm font-medium text-secondary-50 bg-[#007AFF] rounded-20 px-2.5 py-[3px]">
            @{data?.uniqueName}
          </span>

          <Link
            href={data?.websiteUrl || ""}
            target="_blank"
            rel="noopener noreferrer"
            className="transition duration-200 opacity-0 invisible group-hover/inner-header:opacity-100 group-hover/inner-header:visible"
          >
            <Image src={icons.iconLink} alt="Website" width={20} height={20} />
          </Link>
        </div>
        <p className="text-base text-primary-500">
          {GetDate(data.timeCreated)} {GetTime(data?.timeCreated)}
        </p>
      </div>
    </div>
  );
};

const ApplicationInfoHeader = () => {
  // Get application data and reload function from context.
  const { handleReload, applicationData } = useApplicationInfo();
  const { openModal } = useTemplate();
  return (
    <div className="flex justify-between items-start ">
      <HeaderLeftCol data={applicationData?.application} />
      <div className="flex gap-2 justify-end">
        {applicationData?.docsPage?.length > 0 ? (
          <div className=" flex justify-end">
            <Button
              onClick={() => openModal("create-docs-menu-item")}
              title="+ Create Main Menu"
              className="w-48"
            />
          </div>
        ) : null}
        <ButtonRefresh onClick={handleReload} disabled={!applicationData} />
      </div>
    </div>
  );
};

export default ApplicationInfoHeader;
