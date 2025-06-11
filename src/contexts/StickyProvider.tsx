"use client";
import { createContext, ReactNode, use, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

interface IStickyProviderProps {
  children: ReactNode;
}

interface IStickyContext {
  scrollDirection: "up" | "down";
  isDown: boolean;
}

const StickyContext = createContext<IStickyContext>({} as IStickyContext);

export const useSticky = () => use(StickyContext) as IStickyContext;

export const StickyProvider = ({ children }: IStickyProviderProps) => {
  const [scrollDirection, setScrollDirection] = useState<IStickyContext["scrollDirection"]>("up");
  const [isDown, setIsDown] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      setIsDown(true);
    } else {
      setIsDown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //SET scroll direction
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScrollDirection = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScrollDirection);

    return () => {
      window.removeEventListener("scroll", handleScrollDirection);
    };
  }, []);

  const value = useMemo(() => {
    return {
      scrollDirection,
      isDown,
    };
  }, [isDown, scrollDirection, window?.scrollY]);

  return <StickyContext.Provider value={value}>{children}</StickyContext.Provider>;
};
