import Image from "next/image";
import React from "react";
import imgRequestBlood from "@/public/assets/image/img-req-blood.svg";

const HomeBloodRequestSection = () => {
  return (
    <div className="flex items-center gap-[60px]">
      <div className="flex flex-col items-start justify-center w-[630px]">
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-[45px] leading-[55px] font-medium text-start">
            Blood Request
          </h2>
          <span className="relative -top-2">
            <svg
              width="260"
              height="13"
              viewBox="0 0 260 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 11C95.4257 -2.75071 151.849 -1.90932 258.5 11"
                stroke="#EF0000"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </div>
        <p className="text-gray text-justify text-lg mt-3.5">
          If you or a loved one is in need of blood, or if you’d like to help
          others by becoming a donor, please fill out the request form. Our team
          will carefully review your submission and reach out to you as soon as
          possible. Every request and every donation brings hope — thank you for
          being part of this life-saving effort
        </p>
      </div>
      <Image
        alt=""
        src={imgRequestBlood}
        width={100}
        height={100}
        sizes="100vw"
        className="w-[750px] h-[450px]"
      />
    </div>
  );
};

export default HomeBloodRequestSection;
