"use client";
import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import HeaderServiceBtnComp from "./HeaderServiceBtnComp";
import HeaderMenuNotificationComp from "./HeaderMenuNotificationComp";
// import { ProfileManage } from "@src/utils";
import AuthCompWrapper from "@/bik-lib/context/auth/AuthCompWrapper";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bikiran/button";
import HeaderAddBtnComp from "./HeaderAddBtnComp";
import { usePathname } from "next/navigation";
import { cn } from "@/bik-lib/utils/cn";

const HeaderLoginColumnComp: FC = ({}) => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center justify-end gap-3.5 lg:gap-4">
      <li>
        <Button className="px-7.5 py-3 !bg-white !text-[#EF0000] !rounded-8">
          Sign In
        </Button>
      </li>
      <li></li>
      <li></li>
      <li className="-mx-1"></li>
      <li></li>
    </ul>
  );
};

export default HeaderLoginColumnComp;
