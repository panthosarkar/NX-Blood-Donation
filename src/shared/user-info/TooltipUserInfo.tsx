import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/bik-lib/utils/cn";

type TProps = {
  user: any;
  show: number | null;
  setShow: (id: number | null) => void;
};

const TooltipUserInfo: FC<TProps> = ({ user, setShow, show }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShow(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShow]);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <div
        onClick={() => setShow(show === user.id ? null : user.id)}
        className="cursor-pointer"
      >
        <Image
          src={user?.photoUrl || "/assets/images/icons/user.svg"}
          alt="user"
          width={0}
          height={0}
          sizes="100vw"
          className="size-7 xl:size-10 rounded-full"
        />
      </div>
      <div
        className={cn(
          "absolute left-1/2 bottom-full mb-3 -translate-x-1/2 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none transition-all duration-200",
          "opacity-0 scale-95 pointer-events-none",
          show === user.id && "opacity-100 scale-100 pointer-events-auto" // Show when active
        )}
      >
        <div className="flex items-center gap-3">
          <Image
            src={user?.photoUrl || "/assets/images/icons/user.svg"}
            alt="user"
            width={0}
            height={0}
            sizes="100vh"
            className="rounded-full size-10"
          />
          <div>
            <div className="text-primary font-medium">{user.displayName}</div>
            <div className="text-primary-500">{user.email}</div>
          </div>
        </div>
        {/* Tooltip Arrow */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
      </div>
    </div>
  );
};

export default TooltipUserInfo;
