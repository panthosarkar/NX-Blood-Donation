import Image from "next/image";
import IconDefaultLogo from "./OptionDefaultLogo";
import { cn } from "@/bik-lib/utils/cn";
import React from "react";

interface IOption {
  id: string;
  logo?: string;
  title: string;
  value: string;
}

interface IOptionComponent {
  option: IOption;
  showLogo: boolean;
  selected: boolean;
  onClick: () => void;
}
export const addOption = (
  param1: string,
  param2: string,
  param3: string,
  param4?: string
): IOption => {
  //if 3 params is passed, then the object will be like this: id, title, value
  //if 4 params is passed, then the object will be like this: id, logo, title, value
  if (typeof param4 === "undefined") {
    return { id: param1, title: param2, value: param3 };
  }
  return { id: param1, logo: param2, title: param3, value: param4 };
};

const Option: React.FC<IOptionComponent> = ({
  option,
  showLogo,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cn(
        "group size-full h-10 flex items-center justify-between p-[5px] pr-4 first:rounded-tr-10 first:rounded-tl-10 last:rounded-br-10 last:rounded-bl-10",
        {
          "hover:bg-secondary-50": !selected,
          "bg-secondary-50": selected,
        }
      )}
      onClick={onClick}
    >
      <div
        className={cn("flex gap-3 items-center w-[calc(100%_-_18px)] h-full", {
          "p-2": !showLogo,
        })}
      >
        {showLogo && (
          <div
            className={cn(
              "w-full h-full max-w-[30px] p-1 rounded-[6px] bg-white"
              // {
              //   "bg-secondary-50 group-hover:bg-white": !selected,
              // }
            )}
          >
            {option?.logo ? (
              <Image
                src={option?.logo}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                className="size-full rounded-[6px] object-contain"
              />
            ) : (
              <IconDefaultLogo />
            )}
          </div>
        )}

        <div className="overflow-hidden">
          <h3 className="text-primary text-base font-normal overflow-hidden whitespace-nowrap text-ellipsis">
            {option?.title || "All Applications"}
          </h3>
        </div>
      </div>

      <div className="w-[18px]">
        <input
          type="checkbox"
          onChange={() => {}}
          checked={selected || false}
        />
      </div>
    </button>
  );
};

export default Option;
