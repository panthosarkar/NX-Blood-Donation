"use client";
import { cn } from "@/bik-lib/utils/cn";
import { FC, ReactNode } from "react";
import "./adv-menu.css";
import AdvMenu from "@/bikiran/shared/adv-menu/AdvMenu";
import { useAdvMenu } from "@/bikiran/shared/adv-menu/AdvMenuProvider";

type Props = {
  className?: string;
  children: ReactNode;
};

const AdvMenuLayout: FC<Props> = ({ className, children }) => {
  const { drawerOpen } = useAdvMenu();

  return (
    <main
      className={cn("page", className, {
        active: drawerOpen,
      })}
    >
      <AdvMenu />

      <div className="page-content-container">
        <div>{children}</div>
      </div>
    </main>
  );
};

export default AdvMenuLayout;
