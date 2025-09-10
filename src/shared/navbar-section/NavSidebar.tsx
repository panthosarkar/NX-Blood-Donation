import { icons } from "@/library/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const NavSidebar = () => {
  const [show, setShow] = useState<boolean>(false);

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
    <div className="sm:hidden">
      <button onClick={() => setShow(true)}>Open</button>

      <div
        className="fixed top-0 left-0 w-full h-screen bg-white z-50 transition-transform duration-300 p-5"
        style={{
          transform: show ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-end h-10">
          <button onClick={() => setShow(false)}>Close</button>
        </div>
        <div className="h-full w-full">
          <ul className="w-full space-y-1.5">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`text-lg font-medium cursor-pointer py-2.5 px-3.5 rounded-10  transition-all ease-in-out duration-300 ${
                  activeLink === link.path
                    ? "text-white bg-primary"
                    : "text-primary"
                }`}
                onClick={() => setActiveLink(link.path)}
              >
                <Link href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
