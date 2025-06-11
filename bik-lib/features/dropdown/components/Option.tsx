import Image from "next/image";
import { cName } from "./cName";
import IconDefaultLogo from "./OptionDefaultLogo";
import React from "react";

interface OptionProps {
  option: {
    logo?: string;
    title?: string;
  };
  showLogo: boolean;
  selected: boolean;
  onClick: () => void;
}

const Option: React.FC<OptionProps> = ({
  option,
  showLogo,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cName(
        "group size-full flex items-center justify-between p-[5px] pr-4 first:rounded-tr-10 first:rounded-tl-10 last:rounded-br-10 last:rounded-bl-10",
        {
          "hover:bg-secondary-50": !selected,
          "bg-secondary-50": selected,
        }
      )}
      onClick={onClick}
    >
      <div
        className={cName("flex gap-3 items-center", {
          "p-2": !showLogo,
        })}
      >
        {showLogo && (
          <div
            className={cName("w-10 p-[6px] rounded-[6px] bg-white", {
              "bg-secondary-50 group-hover:bg-white": !selected,
            })}
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

      {selected && (
        <div className="w-[18px]">
          <span className="text-secondary">✓</span>
        </div>
      )}
    </button>
  );
};

export default Option;
