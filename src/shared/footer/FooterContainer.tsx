import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import logo from "@/public/assets/image/logo.svg";
import { contactInfo, linkInfo } from "@/src/components/home-page/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterContactInfoComp: FC<{
  icon: string;
  title: string;
  value: string;
}> = ({ icon, title, value }) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={icon}
        alt="Logo"
        width={100}
        height={100}
        sizes="100vw"
        className="size-10"
      />
      <div>
        <h4 className="text-lg font-medium">{title}</h4>
        <p className="text-gray">{value}</p>
      </div>
    </div>
  );
};

const FooterLogoAndTextComp = () => {
  return (
    <div className="space-y-7.5">
      <div className="space-y-5">
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={100}
          sizes="100vw"
          className="w-[250px]"
        />
        <p className="text-lg leading-5 text-gray">
          Your blood can save lives. Every donation helps patients in
          emergencies, surgeries, and cancer treatments. It only takes a few
          minutes to make a life-changing difference. Join our growing community
          of heroes—donate blood and give someone a second chance
        </p>
      </div>
      <div className="space-y-2.5">
        {contactInfo.map((info) => (
          <FooterContactInfoComp
            key={info.title}
            icon={info.icon}
            title={info.title}
            value={info.value}
          />
        ))}
      </div>
    </div>
  );
};

const Links = ({ links }) => {
  return (
    <ul className="space-y-5">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.url}
            className="text-gray font-medium hover:text-primary transition-all duration-300 ease-in-out"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const FooterLinkComp = () => {
  return (
    <div className="flex items-start justify-between">
      {linkInfo?.map((section) => (
        <div key={section.title} className="space-y-2.5">
          <div>
            <h4 className="text-2xl font-medium">{section.title}</h4>
            <svg
              width="75"
              height="2"
              viewBox="0 0 75 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="75" height="2" rx="1" fill="#EF0000" />
            </svg>
          </div>
          {section.title === "Social Links" ? (
            <ul className="space-y-5">
              {section.links.map((link) => (
                <li key={link.name} className="flex items-center gap-2 ">
                  <Image
                    src={link.icon}
                    alt={link.name}
                    width={100}
                    height={100}
                    sizes="100vw"
                    className="size-6"
                  />
                  <Link
                    href={link.url}
                    className="text-gray font-medium hover:text-primary transition-all duration-300 ease-in-out"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Links links={section.links} />
          )}
        </div>
      ))}
    </div>
  );
};

const FooterContainer = () => {
  return (
    <div className="grid grid-cols-2 items-start gap-[208px]">
      <FooterLogoAndTextComp />
      <FooterLinkComp />
    </div>
  );
};

export default FooterContainer;
