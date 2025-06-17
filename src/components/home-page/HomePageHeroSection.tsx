import { Button } from "@bikiran/button";
import Image from "next/image";
import React from "react";
import heroSectionImage from "@/public/assets/image/hero-section-img.svg";

const HomePageHeroSection = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[630px]">
        <h1 className="text-[70px] leading-[85px] font-medium text-black text-nowrap">
          One <span className="text-primary">Drop</span> Can Save <br />a{" "}
          <span className="text-primary">Life</span>
        </h1>
        <p className="text-lg text-gray text-justify">
          Thousands of patients depend on blood donations every day. Your
          generosity can bring hope to accident victims, cancer patients, and
          newborns. Join the movement and become someone’s lifeline
        </p>
        <div className="flex items-center gap-4 mt-[50px]">
          <Button className="bg-primary text-white px-7.5 py-3 rounded-8">
            Blood Request
          </Button>
          <Button className="!bg-primary-50 !text-primary px-7.5 py-3 rounded-8">
            Donate Blood
          </Button>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Image
          src={heroSectionImage}
          alt="Blood Donation"
          width={100}
          height={100}
          sizes="100vw"
          className="w-[700px] h-[760px]"
        />
      </div>
    </div>
  );
};

export default HomePageHeroSection;
