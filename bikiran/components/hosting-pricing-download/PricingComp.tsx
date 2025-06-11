"use client";
import { cn } from "@/bik-lib/utils/cn";
import { icons } from "@/bikiran/lib/icons";
import { THostingPkg } from "../hosting-pricing/HostingTypes";
import { FC, useEffect } from "react";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import Image from "next/image";

const generalFeatures = [
  "Hosting Location Singapore (SG)/Unites States (US)",
  "Average Ping Time 60ms (SG)/300ms (US) form Bangladesh",
  "SSD Hosting (10x Faster than HDD)",
  "99.9 % Uptime",
  "Daily Backup up to 30 Days",
  "cPanel Feature Included",
  "Hosting Transfer (Free)",
  "SSL for all domains & sub-domain (Free)",
  "24-hour phone/email support (Free)",
  "24-hour monitoring",
];

const serverFeatures = [
  "Subdomains: Unlimited",
  "Email Accounts: Unlimited",
  "cPanel Access: Yes",
  "Hosting Transfer: Free",
  "FTP Server: Yes",
  "DNS Server: Yes",
  "Mail Server: Exim Mail Server",
];

const TitleArea: FC<{ type: string }> = ({ type }) => {
  if (type === "WEB") {
    return (
      <div className="text-center text-primary font-medium mb-3">
        <h2 className="text-3xl leading-9">Web Hosting</h2>
        <p className="text-sm">(SSD Shared)</p>
      </div>
    );
  }
  if (type === "EMAIL") {
    return (
      <div className="text-center text-primary font-medium mb-3">
        <h2 className="text-3xl leading-9">Email Hosting</h2>
        <p className="text-sm">(SSD Shared)</p>
      </div>
    );
  }
  return (
    <div className="text-center text-primary font-medium mb-3">
      <h2 className="text-3xl leading-9">App Hosting</h2>
      <p className="text-sm">(NVMe SSD Shared)</p>
    </div>
  );
};

const OtherInfo: FC<{ title: string; icon: string }> = ({ title, icon }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-secondary-100 text-secondary border border-secondary-300 rounded-[6px] p-2 h-7.5"
      )}
    >
      <div className="w-7.5">
        <Image
          src={icon}
          alt="alt"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
      <span className="text-xs font-medium whitespace-nowrap">{title}</span>
    </div>
  );
};

const Feature: FC<{ features: string[] }> = ({ features }) => {
  return (
    <div className="bg-[#FFF2F2] pr-6 py-4 pl-10 rounded-10">
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="list-disc">
            <p className="text-xs text-primary leading-5">{feature}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PricingComp: FC<{
  data: THostingPkg[];
  query: Record<string, any>;
  type: string;
}> = ({ data, query, type }) => {
  useEffect(() => {
    // remove overflow hidden style from the body
    const removeOverflowHidden = () => {
      const body = document.querySelector("body");
      if (body) {
        body.classList.add("!overflow-auto", "print:!bg-white");
      }
    };
    removeOverflowHidden();
  }, []);

  const packages = data?.filter(
    (pkg) => pkg?.subType === type && pkg?.status === "active"
  );

  return (
    <div className=" w-full flex justify-center items-center print:items-baseline  print:bg-white">
      <div className="w-full print:max-w-max p-5 print:p-0 bg-white print:bg-transparent">
        <TitleArea type={type} />
        <section className="grid grid-cols-2 gap-8.5 mb-4">
          <Feature features={generalFeatures} />
          <Feature features={serverFeatures} />
        </section>

        <section className="mb-16">
          <h3 className="text-sm font-medium text-primary mb-2.5">
            Hosting Packages:
          </h3>
          <div className="overflow-x-auto mb-5">
            <div className="min-w-full shadow-md rounded-lg">
              {/* Table Header */}
              <div className="grid grid-cols-5 items-center justify-between bg-[rgba(174,0,185,0.05)] text-secondary text-sm font-medium h-[34px] rounded-[6px] ">
                <div className="flex items-center justify-center">
                  Disk Space
                </div>
                <div className="flex items-center justify-center">
                  Bandwidth
                </div>
                <div className="flex items-center justify-center">Domains</div>
                <div className="flex items-center justify-center">Price</div>
                <div className="flex items-center justify-center">
                  Locations
                </div>
              </div>
              {/* Table Body */}
              {packages.map((pkg, index) => (
                <div
                  key={pkg?.id}
                  className={cn(
                    "grid grid-cols-5 items-center justify-between bg-[rgba(19,15,64,0.05)] text-secondary text-sm font-medium h-[34px] rounded-[6px] [&>div]:text-primary",
                    {
                      "bg-white": index % 2 === 0,
                    }
                  )}
                >
                  <div className="flex items-center justify-center">
                    {pkg?.disk / 1024 > 1
                      ? `${showInt(pkg?.disk / 1024, 0)} GB`
                      : `${showInt(pkg?.disk)} MB`}
                  </div>
                  <div className="flex items-center justify-center">
                    {pkg?.bandwidth / 1024 > 1
                      ? `${showInt(pkg?.bandwidth / 1024, 0)} GB`
                      : `${showInt(pkg?.bandwidth)} MB`}
                    <small>/mo</small>
                  </div>
                  <div className="flex items-center justify-center">
                    No Limit
                  </div>
                  <div className="flex items-center justify-center !text-[#17BE46]">
                    {showCurrencySign(pkg?.currency)}{" "}
                    {showInt(pkg?.pricePromotion * 12)}/Year
                  </div>
                  <div className="flex items-center justify-center">
                    {pkg?.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-start gap-3.5">
            <OtherInfo title="2 Core" icon={icons.core} />
            <OtherInfo title="4 GB" icon={icons.ram} />
            <OtherInfo title="200" icon={icons.ep} />
            <OtherInfo title="Unlimited" icon={icons.io} />
            <span className="text-xs font-medium whitespace-nowrap text-primary">
              With each package
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingComp;
