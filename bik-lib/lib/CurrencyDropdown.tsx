"use client";

import { useApp } from "@/bik-lib/context/AppProvider";
import { cn } from "@/bik-lib/features/dropdown/CustomDropdown";
import { TMouseEvent } from "@/bik-lib/types/event";
import { useEffect, useRef, useState, ReactNode, MouseEvent } from "react";

interface IconArrowProps {
  className?: string;
}

interface OptionProps {
  item: { currency?: string };
  isCurrent: boolean;
  onClick: (ev: MouseEvent<HTMLButtonElement>) => void;
}

interface CurrencyDropdownProps {
  children?: ReactNode;
  className?: string;
}

function IconArrow({ className }: IconArrowProps) {
  return (
    <svg
      width="12"
      height="7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transform transition-all", className)}
    >
      <path
        d="M.808 5.159a.971.971 0 1 0 1.387 1.36l2.45-2.499c.627-.638.94-.958 1.337-.973.397-.015.734.28 1.407.868l2.636 2.303a.971.971 0 0 0 1.278-1.463l-4.016-3.51C6.613.656 6.277.362 5.879.378c-.397.015-.71.334-1.336.973L.808 5.159Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Option({ item, isCurrent, onClick }: OptionProps) {
  return (
    <button
      type="button"
      className={`dropdown_option ${isCurrent ? "active" : ""}`}
      onClick={onClick}
    >
      <span>{item?.currency || "--"}</span>{" "}
      <span>{item?.currency === "USD" ? "$" : "৳"}</span>
    </button>
  );
}

function CurrencyDropdown({ children, className }: CurrencyDropdownProps) {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { currencies, locale, handelChangeLocale } = useApp();

  const handleOptionClick = (ev: TMouseEvent, item: { currency?: string }) => {
    setOpen(true);
    handelChangeLocale(item?.currency as any);
  };

  const handleMenuClick = (ev: TMouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(true);
      }
    }

    document.addEventListener("mousedown", (ev) =>
      handleClickOutside(ev as any)
    );
    return () => {
      document.removeEventListener("mousedown", (ev) =>
        handleClickOutside(ev as any)
      );
    };
  }, [ref]);

  return (
    <div
      className={cn("currency_dropdown", className, {
        active: !open,
      })}
      ref={ref}
    >
      {children ? (
        <button type="button" className="" onClick={handleMenuClick}>
          {children}
        </button>
      ) : (
        <button
          type="button"
          className="w-full flex items-center justify-between"
          onClick={handleMenuClick}
        >
          <h2 className="dropdown_title">{locale?.currency}</h2>
          <IconArrow
            className={cn("text-white", {
              "rotate-0": !open,
              "rotate-180": open,
            })}
          />
        </button>
      )}

      <div className="dropdown_option_container">
        {currencies &&
          currencies.map((item: any) => (
            <Option
              key={item.currency}
              item={item}
              isCurrent={locale?.currency === item?.currency}
              onClick={(ev) => handleOptionClick(ev, item)}
            />
          ))}
      </div>
    </div>
  );
}

export default CurrencyDropdown;
