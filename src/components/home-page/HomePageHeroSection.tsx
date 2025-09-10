import { Button } from "@bikiran/button";
import Image from "next/image";
import React from "react";
import heroSectionImage from "@/public/assets/image/hero-section-img.svg";

const HomePageHeroSection = () => {
  return (
    <div className="sm:flex items-center justify-between">
      <div className="sm:w-[630px]">
        <h1 className="sm:text-[70px] text-4xl sm:leading-[85px] font-medium text-black text-nowrap">
          One <span className="text-primary">Drop</span> Can Save <br />a{" "}
          <span className="text-primary">Life</span>
        </h1>
        <p className="text-lg text-gray text-justify">
          Thousands of patients depend on blood donations every day. Your
          generosity can bring hope to accident victims, cancer patients, and
          newborns. Join the movement and become someone's lifeline
        </p>
        <div className="flex items-center sm:justify-normal justify-center gap-4 sm:mt-[50px] mt-6">
          <Button className="bg-primary text-white sm:px-7.5 sm:py-3 px-3.5 py-1.5 rounded-8 hover:bg-primary-50 hover:text-primary transition-all duration-300 ease-in-out">
            Blood Request
          </Button>
          <Button className="!bg-primary-50 !text-primary sm:px-7.5 sm:py-3 px-3.5 py-1.5 rounded-8 hover:!bg-primary hover:!text-white transition-all duration-300 ease-in-out">
            Donate Blood
          </Button>
        </div>
      </div>
      <div className="flex-shrink-0 sm:w-[700px] sm:h-[760px] w-full mt-10 sm:mt-0">
        <Image
          src={heroSectionImage}
          alt="Blood Donation"
          width={100}
          height={100}
          sizes="100vw"
          className="size-full"
        />
      </div>
    </div>
  );
};

export default HomePageHeroSection;
