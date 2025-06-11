/* eslint-disable no-unused-vars */
"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import ServiceApp from "./components/ServiceApp";
import { useApp } from "@/bik-lib/context/AppProvider";
import AppAccount from "./components/AppAccount";
import Image from "next/image";
import { cartIcons } from "../cart-menu/icons/cartIcons";

interface ServicesPopupProps {
  auth: {
    currentUser?: {
      photoUrl?: string;
    };
  };
  apps?: {
    id: string;
    status: string;
  }[];
  setShow: (show: boolean) => void;
  ref?: any;
}

type TBtnProps = {
  onClick: (ev: any) => void;
};
const ButtonClose: FC<TBtnProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="size-[32px] bg-[rgba(245,3,3,0.10)] rounded-full p-2 ml-3"
    >
      <Image
        src={cartIcons.cross}
        alt="cross"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-full"
      />
    </div>
  );
};

const ServicesPopup: FC<ServicesPopupProps> = ({
  auth,
  apps = [],
  setShow,
  ref,
}) => {

  const { applicationData } = useApp();

  useEffect(() => {
    // ref outside focus or click or scroll then close the profile info
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const arr = apps?.length
    ? apps.filter((a) => a.status !== "inactive")
    : applicationData?.filter((a) => a.status !== "inactive") || [];

  const staticAppLogo = auth?.currentUser?.photoUrl || "";

  return (
    <div
      className="sm:absolute fixed sm:top-11 top-0 sm:-right-8 -right-0 z-[999] p-2.5 pr-1 bg-[#F7F3F8] shadow-[0px_0px_30px_0px_rgba(19,15,64,0.20)] sm:rounded-30 w-screen sm:w-98 h-screen sm:h-[520px] overflow-hidden"
    >
      <div className="h-full bg-white rounded-[22px] p-[23px] pt-3 overflow-y-scroll custom-scrollbar cursor-default">
        {/* {arr && arr.length === 0 && (
          <div className="size-full flex items-center justify-center">
            <p className="text-primary-700 text-base font-medium">
              No apps available!
          <ButtonClose setShow={setShow} />
          </div>
        )} */}
        <div className="flex items-center justify-end sm:hidden">
          <ButtonClose
            onClick={(ev) => {
              ev.stopPropagation();
              ev.preventDefault();
              setShow(false);
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3 sm:mt-0 mt-5">
          <AppAccount logo={staticAppLogo} />
          {arr.map((app) => (
            <ServiceApp key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPopup;
