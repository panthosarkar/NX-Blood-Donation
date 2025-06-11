"use client";
import { cn } from "@/bik-lib/utils/cn";
import { FC, ReactNode } from "react";
import "./sidebar.css";
import AdvMenu from "@/bikiran/shared/adv-menu/AdvMenu";
import { useAdvMenu } from "@/bikiran/shared/adv-menu/AdvMenuProvider";

type Props = {
  className?: string;
  children: ReactNode;
};

const SidebarLayout: FC<Props> = ({ className, children }) => {
  const { drawerOpen } = useAdvMenu();
  return (
    <main
      className={cn("page", className, {
        active: drawerOpen,
      })}
    >
      <AdvMenu />

      <div className="page-content-container">{children}</div>
    </main>
  );
};

export default SidebarLayout;
