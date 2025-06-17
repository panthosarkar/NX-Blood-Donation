"use client";
import Image from "next/image";
import React, { useState } from "react";
import needBloodImg from "@/public/assets/image/need-blood-img.svg";
import { AnimatedSelect, DateInputField, Select } from "@bikiran/inputs";
import { TInputChangeEvent } from "@bikiran/inputs/dist/lib/types/InputType";
import { bloodGroup } from "@/public/assets/constant/BloodGroup";
import { addOption } from "@/library/utils/option";
import capitalizeFirstLetter from "@/library/utils/capitalizeFirstLetter";
import { Button } from "@bikiran/button";

const FindBloodFormComp = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="w-full bg-white px-5 py-7.5 rounded-10">
      <h3 className="text-2xl leading-5 font-medium text-center">
        Please Enter the required Field
      </h3>
      <form className="flex flex-col gap-[50px] mt-7.5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select
            formData={formData}
            label="Blood Group"
            name="bloodGroup"
            onChange={handleChange}
            placeholder="Select Blood Group"
            className="bg-white"
            containerClassname="[&>div>label]:text-[#181830] [&>div>label]:text-lg &>div>label]:leading-5"
            options={bloodGroup}
          />

          <Select
            formData={formData}
            label="Donor Type"
            name="donorType"
            onChange={handleChange}
            placeholder="Select Donor Type"
            className="bg-white"
            containerClassname="[&>div>label]:text-[#181830] [&>div>label]:text-lg &>div>label]:leading-5"
            options={bloodGroup}
          />
          <Select
            formData={formData}
            label="City"
            name="city"
            onChange={handleChange}
            placeholder="Select Blood Group"
            className="bg-white"
            containerClassname="[&>div>label]:text-[#181830] [&>div>label]:text-lg &>div>label]:leading-5"
            options={[
              {
                id: 1,
                title: "Khulna",
                value: "khulna",
              },
            ]}
          />
          <div className="">
            <label htmlFor="" className="text-[#181830] font-medium text-lg">
              Date of blood donation
            </label>
            <DateInputField
              formData={formData}
              name="dateIssued"
              className="w-full h-full [&_.react-datepicker-wrapper]:h-[45px] [&>div_.react-datepicker-input]:text-black"
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg self-center"
        >
          Search Available Donor
        </Button>
      </form>
    </div>
  );
};

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
        <FindBloodFormComp />
      </div>
    </div>
  );
};

export default HomeFindBloodSection;
