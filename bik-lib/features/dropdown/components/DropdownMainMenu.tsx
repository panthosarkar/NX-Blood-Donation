import Image from "next/image";
import { cName } from "./cName";
import IconDefaultLogo from "./OptionDefaultLogo";
import React from "react";

interface IIconArrow {
  className?: string;
}

interface IMainMenu {
  show: boolean;
  showLogo: boolean;
  onClick: () => void;
  data: {
    defaultLogo?: string;
    defaultValue?: string;
  };
}

const IconArrow: React.FC<IIconArrow> = ({ className }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.1964 7.04869C16.2283 7.0209 16.2443 7.007 16.2569 6.99538C16.8668 6.43712 16.8668 5.47604 16.2569 4.91779C16.2442 4.90617 16.2283 4.89228 16.1964 4.86448C16.1767 4.84728 16.1668 4.83868 16.1576 4.83096C15.7304 4.47131 15.1311 4.39807 14.6298 4.64425C14.6191 4.64953 14.6074 4.65551 14.5841 4.66745L10.2846 6.8708C9.6548 7.19355 9.3399 7.35493 9.00007 7.35493C8.66023 7.35493 8.34534 7.19355 7.71554 6.8708L3.41604 4.66745C3.39273 4.65551 3.38108 4.64953 3.37031 4.64425C2.86908 4.39807 2.26973 4.47131 1.84253 4.83095C1.83335 4.83868 1.82348 4.84728 1.80374 4.86448C1.77184 4.89228 1.7559 4.90617 1.7432 4.91779C1.13332 5.47604 1.13331 6.43712 1.74319 6.99538C1.75588 7.007 1.77183 7.0209 1.80372 7.04869L7.14968 11.7073C8.0316 12.4758 8.47256 12.86 9.00007 12.86C9.52757 12.86 9.96853 12.4758 10.8505 11.7073L16.1964 7.04869Z"
        fill="#5A577A"
      />
    </svg>
  );
};

const DropdownMainMenu: React.FC<IMainMenu> = ({
  show,
  showLogo,
  onClick,
  data,
}) => {
  return (
    <button
      type="button"
      className={cName(
        "group size-full flex gap-3 items-center justify-between p-[5px] pr-4",
        {
          "pl-4": !showLogo,
        }
      )}
      onClick={onClick}
    >
      <div className="flex gap-3 items-center overflow-hidden h-full">
        {showLogo && (
          <div className="w-full h-full max-w-10 p-1 rounded-[6px] bg-white">
            {data.defaultLogo ? (
              <Image
                src={data.defaultLogo}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto rounded-[6px]"
              />
            ) : (
              <IconDefaultLogo />
            )}
          </div>
        )}

        <div className="overflow-hidden">
          <h3 className="text-primary text-base font-normal overflow-hidden whitespace-nowrap text-ellipsis">
            {data.defaultValue || "Select an option"}
          </h3>
        </div>
      </div>

      <div className="w-[18px]">
        <IconArrow
          className={cName("w-full h-auto transition-all duration-500", {
            "transform rotate-180": show,
          })}
        />
      </div>
    </button>
  );
};

export default DropdownMainMenu;
