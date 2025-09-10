import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/assets/image/logo.svg";
import { Button } from "@bikiran/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavSidebar from "./NavSidebar";

const NavbarLogoComp = () => {
  return (
    <Image
      src={logo}
      alt="Logo"
      width={100}
      height={100}
      sizes="100vw"
      className="sm:w-[250px] w-[150px]"
    />
  );
};

const NavbarLinks = () => {
  const [activeLink, setActiveLink] = useState<string>("/");
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Donor", path: "/find-donor" },
    { name: "Blood Request", path: "/blood-request" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    switch (pathname) {
      case "/":
        setActiveLink("/");
        break;
      case "/find-donor":
        setActiveLink("/find-donor");
        break;
      case "/blood-request":
        setActiveLink("/blood-request");
        break;
      case "/about":
        setActiveLink("/about");
        break;
      case "/contact":
        setActiveLink("/contact");
        break;
      default:
        setActiveLink("/");
    }
  }, [pathname]);

  return (
    <ul className="w-full items-center justify-start gap-10 sm:flex hidden">
      {navLinks.map((link) => (
        <li
          key={link.name}
          className={`text-lg font-medium cursor-pointer hover:text-primary  transition-all ease-in-out duration-300 ${
            activeLink === link.path ? "text-primary" : "text-black"
          }`}
          onClick={() => setActiveLink(link.path)}
        >
          <Link href={link.path}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
};

const NavbarContainer = () => {
  return (
    <div className="sm:w-[1400px] w-full flex items-center gap-2.5 sm:px-0 px-5">
      <NavSidebar />
      <div className="w-full flex items-center justify-between sm:gap-20">
        <NavbarLogoComp />
        <NavbarLinks />
        <Link
          href={"/sign-in"}
          className="!text-primary sm:leading-5 sm:text-lg sm:px-[30px] sm:py-3 text-base leading-normal px-3.5 py-1.5 border border-primary !bg-white rounded-8 flex-shrink-0"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default NavbarContainer;
