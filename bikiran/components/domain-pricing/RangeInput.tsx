import { TInputChangeEvent } from "@/bik-lib/types/event";
import { cn } from "@/bik-lib/utils/cn";
import { icons } from "@/bikiran/lib/icons";
import { InformationTooltip } from "@bikiran/utils";
import Image from "next/image";
import React, { FC } from "react";

type TProps = {
  fromField: string;
  toField: string;
  label: string;
  content?: string;
  formData: { [key: string]: any };
  onChange: (ev: TInputChangeEvent) => void;
  onBlur?: (ev: TInputChangeEvent) => void;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  classname?: string;
};

const RangeInputField: FC<TProps> = ({
  fromField,
  toField,
  label,
  formData,
  onChange,
  autoComplete = "off",
  placeholder = "",
  disabled,
  onBlur,
  classname,
}) => {
  const handleInputChange = (ev: TInputChangeEvent) => {
    const { value } = ev.target;
    if (!/^\d*$/.test(value)) {
      return;
    }
    onChange(ev);
  };

  return (
    <div className="grid grid-cols-[150px_auto] gap-4 items-center h-[35px]">
      <label
        htmlFor=""
        className="text-primary  text-base font-medium flex items-center gap-2 h-[35px]"
      >
        <span>{label}</span>
        <InformationTooltip
          content="Enter your minimum and maximum price to filter results within your budget. Leave fields blank for no limit."
          align="bottom"
        >
          <Image
            src={icons.iconInfoLine}
            alt="eye"
            width={100}
            height={100}
            sizes="100vw"
            className="size-5 m-2"
          />
        </InformationTooltip>
      </label>
      <div className="grid grid-cols-[auto_50px_auto] items-center border border-primary-200 rounded-5 px-[10px]">
        <input
          type="text"
          name={fromField}
          value={formData[fromField] || ""}
          onChange={handleInputChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full h-auto outline-none border-none  disabled:grayscale px-[10px] text-center",
            classname
          )}
        />
        <div className="h-[33px] flex bg-primary-100 justify-center items-center">
          <span className="text-primary text-base font-medium">to</span>
        </div>
        <input
          type="text"
          name={toField}
          value={formData[toField] || ""}
          onChange={handleInputChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full h-auto outline-none border-none disabled:grayscale px-[10px] text-center",
            classname
          )}
        />
      </div>
    </div>
  );
};

export default RangeInputField;
