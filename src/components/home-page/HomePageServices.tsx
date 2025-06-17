import React from "react";
import { servicesList } from "./constant";
import Image from "next/image";

const ServicesCardView = () => {
  return (
    <div className="w-full grid grid-cols-4 justify-between">
      {servicesList?.map((service) => (
        <div
          key={service.id}
          className="w-[320px] h-[300px] bg-white rounded-xl shadow-lg p-5.5 flex flex-col items-center justify-center"
        >
          <Image
            src={service.icon}
            alt={service.title}
            width={100}
            height={100}
            sizes="100vw"
            className="w-[135px] h-[130px]"
          />
          <h3 className="text-xl font-semibold">{service.title}</h3>
          <p className="text-gray-600 text-center mt-2">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
};

const HomePageServices = () => {
  return (
    <div className="space-y-[50px]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[45px] leading-[55px] font-medium text-center">
            Our Services
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
        <p className="text-center text-lg leading-5 mt-3.5 text-gray sm:max-w-[800px]">
          From blood donor matching to emergency response and ambulance support,
          we ensure every drop and every second counts.
        </p>
      </div>
      <ServicesCardView />
    </div>
  );
};

export default HomePageServices;
