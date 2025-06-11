"use client";

import { useApp } from "@/bik-lib/context/AppProvider";
import { useEffect, useRef, useState, ReactNode, MouseEvent, FC } from "react";

type TIconArrowProps = {
  className?: string;
};

type TOptionProps = {
  item: { currency?: string };
  isCurrent: boolean;
  onClick: (ev: MouseEvent<HTMLButtonElement>) => void;
};

type TCurrencyDropdownProps = {
  children?: ReactNode;
  className?: string;
  onClick?: (currency: string) => void;
  value?: string;
};

function IconArrow({ className }: TIconArrowProps) {
  return (
    <svg
      width="12"
      height="7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transform transition-all ${className}`}
    >
      <path
        d="M.808 5.159a.971.971 0 1 0 1.387 1.36l2.45-2.499c.627-.638.94-.958 1.337-.973.397-.015.734.28 1.407.868l2.636 2.303a.971.971 0 0 0 1.278-1.463l-4.016-3.51C6.613.656 6.277.362 5.879.378c-.397.015-.71.334-1.336.973L.808 5.159Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Option({ item, isCurrent, onClick }: TOptionProps) {
  return (
    <button
      type="button"
      className={`dropdown-option w-full flex items-center justify-between text-sm py-[7px] px-3 border-b border-secondary-100 last:border-0 first:rounded-tl-[7px] first:rounded-tr-[7px] last:rounded-bl-[7px] last:rounded-br-[7px] hover:text-secondary ${
        isCurrent ? "text-secondary" : "text-primary"
      }`}
      onClick={onClick}
    >
      <span>{item?.currency || "--"}</span>{" "}
      <span>{item?.currency === "USD" ? "$" : "৳"}</span>
    </button>
  );
}

const CurrencySelector: FC<TCurrencyDropdownProps> = ({
  children,
  className,
  onClick,
  value,
}) => {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { currencies, locale, handelChangeLocale } = useApp();

  const isCustomHandler = onClick && typeof onClick === "function";

  const handleOptionClick = (
    ev: React.MouseEvent<HTMLButtonElement>,
    item: { currency?: string }
  ) => {
    setOpen(true);

    if (isCustomHandler) {
      onClick(item?.currency as string);
    } else {
      handelChangeLocale(item?.currency as any);
    }
  };

  const handleMenuClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
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
      className={`size-full rounded-[25px] cursor-pointer relative ${className}`}
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
          <h2 className="dropdown-title text-primary text-sm font-medium">
            {isCustomHandler ? value : locale?.currency}
          </h2>
          <IconArrow
            className={`arrow text-primary ${open ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      )}

      <div
        className={`w-[80px] list bg-white shadow-lg absolute -left-2.5 rounded-[7px] ${
          open
            ? "top-0 -z-10 invisible"
            : "active top-8 z-10 visible transition-all"
        }`}
      >
        {currencies &&
          currencies.map((item: any) => (
            <Option
              key={item.currency}
              item={item}
              isCurrent={
                isCustomHandler
                  ? item?.currency === value
                  : locale?.currency === item?.currency
              }
              onClick={(ev) => handleOptionClick(ev, item)}
            />
          ))}
      </div>
    </div>
  );
};

export default CurrencySelector;
