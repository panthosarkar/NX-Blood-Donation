/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/bikiran/components/ui/drawer";
import { cn } from "@/bik-lib/utils/cn";
import {
  TDrawerDividerProps,
  TDrawerOptionProps,
  TDrawerPopupProps,
} from "./drawerTypes";

export const DrawerDivider: React.FC<TDrawerDividerProps> = ({
  show,
  className,
}) => {
  return show ? <hr className={cn("w-full mt-[12px]", className)} /> : null;
};

export const DrawerOption: React.FC<TDrawerOptionProps> = ({
  children,
  show = true,
  onClick,
  className,
}) => {
  if (!show) return null;

  const isChildrenArray = Array.isArray(children) && children.length > 0;

  return (
    <button
      type="button"
      className={cn(
        "text-primary text-base font-normal text-left space-y-1 w-full",
        className
      )}
      onClick={onClick}
    >
      {isChildrenArray ? children[0] : children}
      {isChildrenArray && children[1]}
    </button>
  );
};

const DrawerPopup: React.FC<TDrawerPopupProps> = ({
  show = true,
  children,
  open,
  setOpen,
  className,
}) => {
  if (!show || !children) return null;

  const isChildrenArray = Array.isArray(children) && children.length > 0;
  const hasVisibleChildren =
    isChildrenArray &&
    children.some((el: React.ReactNode) => {
      return (el as React.ReactElement).props.show;
    });

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent
        aria-describedby={undefined}
        className={cn(
          "rounded-tl-[40px] rounded-tr-[40px] bg-white shadow-[0px_-10px_50px_0px_rgba(19,15,64,0.08)]",
          className
        )}
      >
        <DrawerHeader className={isChildrenArray ? "border-b" : ""}>
          <DrawerTitle>{isChildrenArray ? children[0] : children}</DrawerTitle>
        </DrawerHeader>

        {isChildrenArray && hasVisibleChildren && (
          <DrawerFooter className="pb-28">
            <div className="space-y-4 relative">
              {children.slice(1).map((child, index) => (
                <div key={index}>{child}</div>
              ))}
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerPopup;
