import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { icons } from "@/bikiran/lib/icons";
import Image from "next/image";
import { FC } from "react";

const getBgColor = (role: string) => {
  switch (role) {
    case "owner":
      return "bg-[#EDCBFF] text-[#A500F8]";
    case "admin":
      return "bg-[#FFDBC5] text-[#FF6200]";
    case "hold":
      return "bg-[#FFDBC5] text-[#FF6200]";
    case "viewer":
      return "bg-[#EDCBFF] text-[#A500F8]";
    case "manager":
      return "bg-[#D7DFFF] text-[#5E7EFF]";
    case "developer":
      return "bg-[#D0F4FF] text-[#009CCC]";
    case "tester":
      return "bg-[#B9FFD6] text-[#00B049]";
    case "editor":
      return "bg-[#FFDBC5] text-[#FF6200]";

    default:
      return "";
  }
};

export const RoleTag: FC<{ role: string }> = ({ role }) => {
  return (
    <div
      className={`text-xs font-medium px-2.5 py-0.5 h-5 rounded-5 leading-4 inline-block ${getBgColor(
        role
      )}`}
    >
      {capitalizeFirstLetter(role)}
    </div>
  );
};

export const PendingTag: FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;
  return (
    <TooltipWrapper content="Pending">
      <div className="w-4.5">
        <Image
          // src={icons.iconPending}
          src={icons.iconAction}
          alt="pending"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </TooltipWrapper>
  );
};
