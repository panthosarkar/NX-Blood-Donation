import React from "react";
import NavbarContainer from "./NavbarContainer";

const Navbar = () => {
  return (
    <div className="w-full h-[72px] bg-transparent fixed top-0 left-0 flex items-center justify-center z-50">
      <NavbarContainer />
    </div>
  );
};

export default Navbar;
