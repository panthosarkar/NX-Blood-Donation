import React from "react";
import { cn } from "@/src/utils/cn";
import { useSticky } from "@/src/contexts/StickyProvider";
import { menuList } from "./MenuList";
import Link from "next/link";
import { LightIcon } from "@/src/lib/icon-svg/svg-icon";
import { usePathname } from "next/navigation";

export const LayoutWeb = () => {
  const { scrollDirection } = useSticky();
  const pathname = usePathname();

  return (
    <nav
      className={cn(`fixed top-0 z-50 w-full bg-transparent backdrop-blur-[30px] transition-all sm:h-18.5`, {
        "shadow-[0px_4px_50px_0px_rgba(0,7,27,0.05)]": scrollDirection === "down",
      })}
    >
      <div className="container mx-auto flex h-full w-full items-center justify-between">
        <div className="flex w-full items-center">
          <Link href={"/"} className="items-center text-3xl font-semibold text-white">
            Blood Donor
          </Link>
        </div>
        <div className="text-secondary flex w-full gap-5">
          {menuList.map((item) => (
            <Link href={item.path} key={item.id} className={cn(`hover:text-primary font-medium`, { "text-primary": item.path === pathname })}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex w-full items-center justify-end gap-2.5">
          <LightIcon />
          <Link href={"/login"} className="text-primary border-primary rounded-[8px] border px-5 py-2 text-lg">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};
