/* eslint-disable no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import DropdownMainMenu from "./components/DropdownMainMenu";
import Option from "./components/Option";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface OptionType {
  id: string;
  value: string;
  logo?: string;
}

interface CustomDropdownProps {
  showLogo?: boolean;
  defaultLogo?: string;
  defaultValue?: string;
  onSelect: (option: OptionType) => void;
  selected?: any;
  options: OptionType[];
}

const CustomDropdown = ({
  showLogo = true,
  defaultLogo,
  defaultValue,
  onSelect,
  selected,
  options,
}: CustomDropdownProps) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const defaultData = { defaultLogo, defaultValue };

  const selectOption = (option: OptionType) => {
    onSelect(option);
    setShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="size-full rounded-10 bg-primary-50 relative" ref={ref}>
      <DropdownMainMenu
        show={show}
        showLogo={showLogo}
        onClick={() => setShow((prev) => !prev)}
        data={defaultData}
      />

      <div
        className={cn(
          "absolute top-0 left-0 -z-10 invisible w-full bg-white shadow-[0px_0px_30px_0px_rgba(19,15,64,0.20)] rounded-10 transition-all duration-500 divide-y",
          {
            "visible top-14 z-10": show,
          }
        )}
      >
        {options.map((option) => (
          <Option
            key={option.id}
            showLogo={showLogo}
            option={option}
            selected={option.id === selected?.id}
            onClick={() => selectOption(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomDropdown;
