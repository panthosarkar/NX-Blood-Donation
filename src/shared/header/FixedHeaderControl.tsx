"use client";
import React, { useEffect, useRef } from "react";
import "./header.css";

type TFixedHeaderControl = {
  children: React.ReactNode;
};

const FixedHeaderControl: React.FC<TFixedHeaderControl> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  // const { windowWidth } = useLayout();

  useEffect(() => {
    const handleScroll = () => {
      if (ref?.current) {
        if (typeof window !== "undefined" && window.scrollY > 5) {
          ref.current.classList.add("position-high");
        } else {
          ref.current.classList.remove("position-high");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="web-header" ref={ref}>
        {children}
      </div>
      <div className="web-header-gap" />
    </>
  );
};

export default FixedHeaderControl;
