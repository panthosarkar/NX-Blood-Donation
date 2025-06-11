"use client";

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { doc, win } from "../utils/dom";

// Define the types for context value
interface LayoutContextType {
  windowWidth: number;
  windowHeight: number;
  windowType: "portrait" | "landscape";
  windowSizeName: string;
  documentWidth: number;
  documentHeight: number;
  sizeList: number[];
  bodyClassNames: string[];
}

// Create the context
const LayoutContext = createContext<LayoutContextType>({
  windowWidth: 0,
  windowHeight: 0,
  windowType: "portrait",
  windowSizeName: "",
  documentWidth: 0,
  documentHeight: 0,
  sizeList: [],
  bodyClassNames: [],
});

export function useLayout() {
  const context = useContext(LayoutContext);

  return context as LayoutContextType;
}

// Define size constants
export const SIZE_XS = 425;
export const SIZE_SM = 576;
export const SIZE_MD = 768;
export const SIZE_LG = 991;
export const SIZE_XL = 1199;
export const SIZE_2XL = 1399;
export const SIZE_3XL = 1599;
export const SIZE_4XL = 1799;
export const SIZE_5XL = 1999;

const sizeList = [
  SIZE_XS,
  SIZE_SM,
  SIZE_MD,
  SIZE_LG,
  SIZE_XL,
  SIZE_2XL,
  SIZE_3XL,
  SIZE_4XL,
];

const getSizeName = (width: number): string => {
  if (width < SIZE_XS) return "xs";
  if (width < SIZE_SM) return "sm";
  if (width < SIZE_MD) return "md";
  if (width < SIZE_LG) return "lg";
  if (width < SIZE_XL) return "xl";
  if (width < SIZE_2XL) return "2xl";
  if (width < SIZE_3XL) return "3xl";
  if (width < SIZE_4XL) return "4xl";
  return "5xl";
};

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [data, setData] = useState<{
    windowWidth: number | undefined;
    windowHeight: number | undefined;
    documentHeight: number | undefined;
    documentWidth: number | undefined;
  }>({
    windowWidth: win?.innerWidth,
    windowHeight: win?.innerHeight,
    documentHeight: doc?.body?.scrollHeight,
    documentWidth: doc?.body?.scrollWidth,
  });

  const windowType: "portrait" | "landscape" =
    data.windowWidth && data.windowHeight
      ? data.windowWidth > data.windowHeight
        ? "landscape"
        : "portrait"
      : "portrait";

  const windowSizeName = data.windowWidth
    ? getSizeName(data.windowWidth)
    : "xs";

  useLayoutEffect(() => {
    function updateSize() {
      setData({
        windowWidth: win?.innerWidth,
        windowHeight: win?.innerHeight,
        documentHeight: doc?.body?.scrollHeight,
        documentWidth: doc?.body?.scrollWidth,
      });
    }

    if (win) {
      win.addEventListener("resize", updateSize);
    }

    return () => {
      if (win) {
        win.removeEventListener("resize", updateSize);
      }
    };
  }, []);

  const value: LayoutContextType = useMemo(() => {
    return {
      windowWidth: data.windowWidth || 0,
      windowHeight: data.windowHeight || 0,
      windowType, // This should now be correctly inferred as "portrait" | "landscape"
      windowSizeName,
      documentWidth: data.documentWidth || 0,
      documentHeight: data.documentHeight || 0,
      sizeList,
      bodyClassNames: [windowType, windowSizeName],
    };
  }, [
    data.documentHeight,
    data.documentWidth,
    data.windowHeight,
    data.windowWidth,
    windowSizeName,
    windowType,
  ]);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
