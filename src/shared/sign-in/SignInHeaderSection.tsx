import Image from "next/image";
import React from "react";
import SignInImage from "./sign-in-img.svg";

const SignInHeaderSection = () => {
  return (
    <div className=" h-screen w-full flex flex-col md:flex-row relative">
      <div className="absolute top-16 left-4 md:left-8 w-8 h-8 md:w-10 md:h-10 z-0">
        <div className="w-full h-full bg-red-500 opacity-80 transform -skew-x-12"></div>
        <div className="w-3/4 h-3/4 bg-red-400 opacity-60 transform -skew-x-12 absolute -bottom-2 -right-2"></div>
      </div>
      <div className="absolute bottom-16 right-4 md:right-8 w-8 h-8 md:w-10 md:h-10 z-0">
        <div className="w-full h-full bg-red-500 opacity-80 transform skew-x-12"></div>
        <div className="w-3/4 h-3/4 bg-red-400 opacity-60 transform skew-x-12 absolute -top-2 -left-2"></div>
      </div>

      <div className="w-full  p-8 md:p-12 flex flex-col justify-center items-center relative">
        <div className="absolute top-8 left-8">
          <a
            href="#"
            className="flex items-center space-x-2 text-2xl font-bold text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
            <span>Blood Donor</span>
          </a>
        </div>

        <div className="max-w-md w-full mt-24 md:mt-0">
          <Image
            alt="sign-in"
            src={SignInImage}
            width={100}
            height={100}
            sizes="100vh"
            className="size-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SignInHeaderSection;
