/* eslint-disable no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import DropdownMainMenu from "./components/DropdownMainMenu";
import Option from "./components/Option";
import { cn } from "@/bik-lib/utils/cn";
import React from "react";

interface IOption {
  id: string;
  logo?: string;
  title: string;
  value: string;
}

interface ISelectorDropdown {
  showLogo?: boolean;
  defaultValue: IOption[];
  onSelect: (selected: any) => void;
  selected: IOption[];
  options: IOption[];
}

const SelectorDropdown: React.FC<ISelectorDropdown> = ({
  showLogo = true,
  defaultValue,
  onSelect,
  selected,
  options,
}) => {
  const [show, setShow] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const selectOption = (option: IOption) => {
    // Logic to add or remove the option from the selected array
    let updatedSelected: IOption[];
    if (selected.find((i) => i.id === option.id)) {
      updatedSelected = selected.filter((i) => i.id !== option.id);
    } else {
      updatedSelected = [...selected, option];
    }
    // Pass the updated array directly to onSelect
    onSelect(updatedSelected);
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
        data={defaultValue}
      />

      <div
        className={cn(
          "absolute top-0 left-0 -z-10 invisible w-full bg-white shadow-[0px_0px_30px_0px_rgba(19,15,64,0.20)] rounded-10 transition-all duration-500 divide-y",
          {
            "visible top-13 z-10": show,
          }
        )}
      >
        {options.map((option) => (
          <Option
            key={option.id}
            showLogo={showLogo}
            option={option}
            selected={selected.some((i) => i.id === option.id)}
            onClick={() => selectOption(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectorDropdown;
