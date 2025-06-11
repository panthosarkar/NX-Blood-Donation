"use client";
import CompanyInfo from "./CompanyInfo";
import ImportantLinks from "./ImportantLinks";
import FindUsSocial from "./FindUsSocial";
import { cn } from "@/bik-lib/utils/cn";

const ContactSec = ({
  className,
  footerIcons,
  dark,
}: {
  className: string;
  footerIcons: any;
  dark?: boolean;
}) => {
  return (
    <div className={cn(className)}>
      <div className="w-full flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div className="w-full flex flex-row sm:gap-3">
          <CompanyInfo className="w-1/2" />
          <ImportantLinks className="w-1/2" />
        </div>
        <FindUsSocial
          className="w-full sm:w-1/2"
          footerIcons={footerIcons}
          dark={dark}
        />
      </div>
    </div>
  );
};

export default ContactSec;
