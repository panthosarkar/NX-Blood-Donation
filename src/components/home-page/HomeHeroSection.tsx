import Image from "next/image";
import React from "react";
import heartImg from "@/public/assets/images/bg-heart.svg";

const HomeHeroSection = () => {
  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex text-nowrap whitespace-nowrap gap-0.5">
        One
        <span>Drop</span> Can Save a <span>Life</span>
      </div>
      <Image
        src={heartImg}
        alt="Heart Background"
        width={100}
        height={100}
        sizes="100vw"
        className="w-[700px]"
      />
    </section>
  );
};

export default HomeHeroSection;
