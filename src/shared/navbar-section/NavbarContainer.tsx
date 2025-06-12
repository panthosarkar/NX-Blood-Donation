import Image from "next/image";
import React from "react";
import logo from "@/public/assets/image/logo.svg";
import { Button } from "@bikiran/button";

const NavbarLogoComp = () => {
  return (
    <Image
      src={logo}
      alt="Logo"
      width={100}
      height={100}
      sizes="100vw"
      className="w-[250px]"
    />
  );
};

const NavbarContainer = () => {
  return (
    <div>
      <NavbarLogoComp />
      <Button className="text-primary">Sign In</Button>
    </div>
  );
};

export default NavbarContainer;
