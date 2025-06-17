"use client";
import React from "react";
import NavbarContainer from "./NavbarContainer";

const Navbar = () => {
  return (
    <div className="h-[72px] bg-transparent flex items-center justify-center fixed top-0 left-0 w-full z-50">
      <NavbarContainer />
    </div>
  );
};

export default Navbar;
