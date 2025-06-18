import { icons } from "@/library/icons";
import Image from "next/image";
import React from "react";

const CurrentServicesComp = () => {
  const services = [
    {
      icon: icons?.iconUserGroup,
      title: "125 Donors",
    },
    {
      icon: icons?.iconLocation,
      title: "64 Districts",
    },
    {
      icon: icons?.iconRequest,
      title: "250 Requests",
    },
  ];

  return (
    <div className="flex justify-evenly items-center bg-white py-[50px] rounded-15 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      {services?.map((service, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-5"
        >
          <Image
            src={service.icon}
            alt={service.title}
            width={100}
            height={100}
            sizes="100vw"
            className="size-[55px]"
          />
          <span className="text-lg">{service.title}</span>
        </div>
      ))}
    </div>
  );
};

const HomeNetworkSection = () => {
  return (
    <div className="space-y-[50px]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[45px] leading-[55px] font-medium text-center">
            A Network of Heroes for <br />
            Critical Blood Needs
          </h2>
          <span className="relative -top-2 -left-[70px]">
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
        <p className="text-gray text-center text-lg mt-3.5 w-[1100px]">
          Whether it’s an emergency or planned surgery, we connect patients with
          verified donors quickly and reliably.Our network is built on trust,
          urgency, and the power of human kindness.
        </p>
      </div>
      <CurrentServicesComp />
    </div>
  );
};

export default HomeNetworkSection;
