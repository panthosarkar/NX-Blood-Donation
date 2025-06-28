"use client";
import React, { act, useEffect, useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import Image from "next/image";
import SignInImage from "./sign-in-img.svg";
import Link from "next/link";
import { cn } from "@/library/utils/cn";

const SignInPage = () => {
  const [activePath, setActivePath] = useState("sign-in");

  return (
    <div className="max-h-full sm:max-h-[600px] h-full bg-white text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center relative">
      <div className="absolute top-4.5 left-8">
        <Link
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
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center px-8 gap-10 justify-center h-full w-full max-w-[1400px] mx-auto ">
        <div className="max-w-md w-full flex-shrink-0 mt-24 md:mt-0 relative">
          <div className="">
            <div className="absolute top-4 md:-top-20 left-0 md:left-0 w-8 h-8 md:w-10 md:h-10 z-0">
              <div className="w-full h-full bg-red-500 opacity-80 transform -skew-x-12"></div>
              <div className="w-3/4 h-3/4 bg-red-400 opacity-60 transform -skew-x-12 absolute -bottom-2 -right-2"></div>
            </div>
            <div className="absolute -bottom-20 right-0 md:right-0 w-8 h-8 md:w-10 md:h-10 z-0">
              <div className="w-full h-full bg-red-500 opacity-80 transform skew-x-12"></div>
              <div className="w-3/4 h-3/4 bg-red-400 opacity-60 transform skew-x-12 absolute -top-2 -left-2"></div>
            </div>
          </div>
          <Image
            alt="sign-in"
            src={SignInImage}
            width={100}
            height={100}
            sizes="100vh"
            className="size-full"
          />
        </div>
        <div className="w-full h-full flex justify-center items-center relative">
          {/* Sign In Form */}
          <div
            className={cn("transition-all duration-300 ease-in-out absolute", {
              "opacity-100 pointer-events-auto z-10": activePath === "sign-in",
              "opacity-0 pointer-events-none z-0": activePath !== "sign-in",
            })}
          >
            <SignInForm setActivePath={setActivePath} />
          </div>

          {/* Sign Up Form */}
          <div
            className={cn("transition-all duration-300 ease-in-out", {
              "opacity-100 pointer-events-auto z-10": activePath === "sign-up",
              "opacity-0 pointer-events-none z-0": activePath !== "sign-up",
            })}
          >
            <SignUpForm setActivePath={setActivePath} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
