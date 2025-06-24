"use client";
import Image from "next/image";
import React, { useState } from "react";
import needBloodImg from "@/public/assets/image/need-blood-img.svg";
import SearchDonorForm from "../shared/search-donor-form/SearchDonorForm";

const HomeFindBloodSection = () => {
  return (
    <div className="space-y-[50px]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[45px] leading-[55px] font-medium text-center">
            Find Blood Donor
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
      </div>
      <div className="flex items-center gap-[60px]">
        <Image
          src={needBloodImg}
          alt="need-blood"
          width={100}
          height={100}
          className="w-[512px] h-[525px]"
        />
        <SearchDonorForm />
      </div>
    </div>
  );
};

export default HomeFindBloodSection;
