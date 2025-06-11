import React from "react";
import FooterSection from "@/bik-lib/features/footer/FooterSection";

const CustomFooterSection = () => {
  return (
    <div className=" pt-[87px] bg-[radial-gradient(149.2%_140.91%_at_65.89%_-24.56%,_#2151AB_0%,_#00060F_100%)]">
      {/* <div className=" w-full flex justify-center">
        <div className="  lg:mx-0 mx-2 lg:w-3/5 text-center text-[#E9EFFF] md:text-[50px] text-[22px] font-semibold md:leading-[60px]">
          Ready to Take Your Digital Presence to the Next Level?
        </div>
      </div>
      <div className=" w-full flex justify-center mt-5">
        <div className="lg:mx-5 mx-2 lg:w-3/5 text-center text-[#BFD0FF] md:text-xl text-sm font-normal leading-8">
          Join the many businesses who trust BIKIRAN for their domain, hosting,
          and application needs. Start your journey today and see the difference
          with our premium solutions.
        </div>
      </div> 
      <div className=" flex justify-center mt-[17px] mb-[30px] pb-[30px] mx-[15px]  ">
        <Button
          variant="blue"
          title="Start Now"
          className="text-center px-[25px] py-2.5 text-base font-medium "
        />
      </div>*/}
      <div className=" container w-full h-[1px] bg-[#958CFF] bg-opacity-20"></div>
      <FooterSection dark />
    </div>
  );
};

export default CustomFooterSection;
