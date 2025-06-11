/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { cn } from "@/bik-lib/utils/cn";
import Image from "next/image";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import searchIcon from "./icon-search.svg";

interface ISearchBar {
  name?: string;
  value: string;
  onChange?: (e: TInputChangeEvent) => void;
  onBlur?: (e: TInputChangeEvent) => void;
  focusColor?: string;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const SearchBar: React.FC<ISearchBar> = ({
  name = "search",
  value,
  onChange,
  onBlur,
  focusColor = "",
  autoComplete = "",
  placeholder = "Search.....",
  disabled = false,
  className,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleBlur = (e: TInputChangeEvent) => {
    if (onBlur) {
      onBlur(e);
    }
    if (ref.current && focusColor?.length > 0) {
      ref.current.classList.remove(`!${focusColor}`);
    }
  };

  const handleFocus = () => {
    if (ref.current && focusColor?.length > 0) {
      ref.current.classList.add(`!${focusColor}`);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full flex items-center rounded-10 bg-primary-50 border border-transparent",
        className,
        {
          "grayscale pointer-events-none": disabled,
        }
      )}
      ref={ref}
    >
      <div className="search-icon max-w-6 w-full mx-3">
        <Image
          src={searchIcon}
          alt="search"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
      <input
        type="text"
        name={name}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full h-full focus:outline-none bg-transparent text-base font-normal pr-2"
      />
    </div>
  );
};

export default SearchBar;
