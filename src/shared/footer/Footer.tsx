import React from "react";
import { menuList } from "../navbar/layout-web/MenuList";
import { FacebookIcon, HomeDIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon, XIcon } from "@/src/lib/icon-svg/svg-icon";
import Link from "next/link";

const FooterLink = () => {
  return (
    <div className="w-full space-y-3">
      <h2 className="mb-5 text-2xl font-medium">Get in Touch</h2>
      <div className="flex gap-3.5">
        <HomeDIcon />
        <p className="text-[#ADADAD]">Old Jessore Rd, Khulna 9000</p>
      </div>
      <div className="flex gap-3.5">
        <PhoneIcon />
        <p className="text-[#ADADAD]">+880 1924548601</p>
      </div>
      <div className="flex gap-3.5">
        <MailIcon />
        <p className="text-[#ADADAD]">info@abdcere.net.bd</p>
      </div>
    </div>
  );
};
const FooterSocial = () => {
  return (
    <div className="w-full">
      <h2 className="mb-[15px] text-[35px] font-medium">Deshi Alumni</h2>
      <p className="max-w-[451px] pt-[15px] pb-[25px] text-[#ADADAD]">
        Whether you're looking to reconnect with old classmates, mentor the next generation, or collaborate on meaningful projects, Deshi Alumni is your
        platform. We host events, share stories, and celebrate the achievements of our members, ensuring that the Deshi spirit continues to grow and inspire
      </p>
      <span className="text-2xl font-medium">Social media</span>
      <div className="mt-[15px] flex gap-5">
        <FacebookIcon />
        <InstagramIcon />
        <XIcon />
        <LinkedinIcon />
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="h-auto w-full rounded-t-[24px] bg-[#1E1F22] pt-12.5">
      <div className="container mx-auto flex w-full">
        <FooterSocial />
        <div className="flex w-full justify-between">
          <div className="w-full">
            <h2 className="mb-5 text-2xl font-medium">Alumni</h2>
            <div className="flex flex-col justify-between">
              {menuList.slice(1).map((item) => (
                <Link href={item.path} key={item.id} className="mb-2.5 text-[#ADADAD]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <FooterLink />
        </div>
      </div>
      <p className="container mx-auto w-full !py-7.5 text-right">Copyright © www.src.com 2025 | All Right Reserved</p>
    </div>
  );
};

export default Footer;
