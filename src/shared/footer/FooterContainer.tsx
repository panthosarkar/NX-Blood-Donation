import Image from "next/image";
import React, { FC } from "react";
import logo from "@/public/assets/image/logo.svg";
import { contactInfo } from "@/src/components/home-page/constant";

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

const FooterLinkComp = () => {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-gray hover:text-blue-500">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-gray hover:text-blue-500">
            About Us
          </a>
        </li>
        <li>
          <a href="#" className="text-gray hover:text-blue-500">
            Contact
          </a>
        </li>
      </ul>
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
