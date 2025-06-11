"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/bik-lib/utils/cn";
import React from "react";

interface ISidebarMenu {
  path: string;
  title: string;
}

interface IBottomRow {
  sidebarMenu: ISidebarMenu[];
}

const HeaderMobileMenu: React.FC<IBottomRow> = ({ sidebarMenu }) => {
  const pathname = usePathname();

  return (
    <div className="header-mobile-menu">
      <ul>
        {sidebarMenu.map((item, index) => (
          <li key={index}>
            <Link
              href={item.path}
              className={cn("", {
                active: pathname === item.path,
              })}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderMobileMenu;
