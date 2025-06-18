import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/assets/image/logo.svg";
import { Button } from "@bikiran/button";
import { usePathname } from "next/navigation";

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
    <ul className="w-full flex items-center justify-start gap-10">
      {navLinks.map((link) => (
        <li
          key={link.name}
          className={`text-lg font-medium cursor-pointer hover:text-primary  transition-all ease-in-out duration-300 ${
            activeLink === link.path ? "text-primary" : "text-black"
          }`}
          onClick={() => setActiveLink(link.path)}
        >
          <a href={link.path}>{link.name}</a>
        </li>
      ))}
    </ul>
  );
};

const NavbarContainer = () => {
  return (
    <div className="w-[1400px] flex items-center justify-between gap-20">
      <NavbarLogoComp />
      <NavbarLinks />
      <Button className="!text-primary leading-5  text-lg px-[30px] py-3 border border-primary !bg-white rounded-8 flex-shrink-0">
        Sign In
      </Button>
    </div>
  );
};

export default NavbarContainer;
