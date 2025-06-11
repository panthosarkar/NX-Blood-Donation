"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import FixedHeaderControl from "./FixedHeaderControl";
import HeaderLoginColumnComp from "./HeaderLoginColumnComp";
import logo from "./icons/icon-comp-logo.svg"; // Adjust the path as necessary

export const CompLogo: FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2 ">
      <div className="w-32">
        <Image
          src={logo}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-full"
          priority
        />
      </div>
    </Link>
  );
};

const HeaderSection: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <FixedHeaderControl>
      <header className={`header_container ${className}`}>
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-3 h-full">
            {/* <HeaderToggleMenuComp /> */}
            <CompLogo />
          </div>

          {/* <HeaderMenuColumnComp setSelectedMenu={setSelectedMenu} /> */}

          <div className="w-[300px] xl:w-[400px]">
            <HeaderLoginColumnComp />
          </div>
        </div>
      </header>
    </FixedHeaderControl>
  );
};

export default HeaderSection;
