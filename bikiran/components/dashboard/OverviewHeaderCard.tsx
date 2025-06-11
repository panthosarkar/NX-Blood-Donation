import React, { ReactNode } from "react";
import Image from "next/image";

interface HeaderCardProps {
  title: string;
  value: string | ReactNode;
  subtext: string;
  icon: string;
  bgColor: string;
  valueColor: string;
}

const OverviewHeaderCard: React.FC<HeaderCardProps> = ({
  title,
  value,
  subtext,
  icon,
  bgColor,
  valueColor,
}) => {
  return (
    <div className="flex items-center border border-primary-100 rounded-[18px] p-[5px] pl-5 bg-white">
      <div className="flex-1">
        <h3 className="text-primary-700 font-medium mb-1">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="size-5">
            <Image
              src={icon}
              alt="alt"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
          <h4 className="text-primary-700 leading-5">{subtext}</h4>
        </div>
      </div>
      <div
        className="w-[100px] h-[85px] rounded-[13px] flex justify-center items-center text-3xl font-semibold"
        style={{
          backgroundColor: bgColor,
          color: valueColor,
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default OverviewHeaderCard;
