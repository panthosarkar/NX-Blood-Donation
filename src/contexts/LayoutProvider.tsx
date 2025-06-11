"use client";

import React, { createContext, useLayoutEffect, useMemo, useState, ReactNode, use } from "react";
import { win, doc, screenInfo } from "../utils/dom";

type TWinLayout = "portrait" | "landscape";

// Define the types for context value
interface LayoutContextType {
  windowWidth: number;
  windowHeight: number;
  windowType: TWinLayout;
  windowSizeName: string;
  documentWidth: number;
  documentHeight: number;
  sizeList: number[];
  bodyClassNames: string[];
}

// Create the context
const LayoutContext = createContext<LayoutContextType>({} as LayoutContextType);

export const useLayout = (): LayoutContextType => use(LayoutContext);

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

const sizeList = [SIZE_XS, SIZE_SM, SIZE_MD, SIZE_LG, SIZE_XL, SIZE_2XL, SIZE_3XL, SIZE_4XL];

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

type TypeOfWindow = {
  windowWidth: number;
  windowHeight: number;
  documentHeight: number;
  documentWidth: number;
};

const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<TypeOfWindow>({
    documentHeight: 0,
    documentWidth: 0,
    windowHeight: 0,
    windowWidth: 0,
  });

  const windowType = useMemo(() => {
    return data.windowWidth && data.windowHeight ? (data.windowWidth > data.windowHeight ? "landscape" : "portrait") : "portrait";
  }, [data.windowHeight, data.windowWidth]);

  const windowSizeName = useMemo(() => {
    return data.windowWidth ? getSizeName(data.windowWidth) : "xs";
  }, [data.windowWidth]);

  useLayoutEffect(() => {
    function updateSize() {
      setData({
        windowWidth: screenInfo?.width,
        windowHeight: screenInfo?.height,
        documentHeight: doc?.body?.scrollHeight,
        documentWidth: doc?.body?.scrollWidth,
      });
    }
    updateSize();

    window?.addEventListener("resize", updateSize);

    return () => {
      window?.removeEventListener("resize", updateSize);
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
  }, [data.documentHeight, data.documentWidth, data.windowHeight, data.windowWidth, windowSizeName, windowType]);

  if (typeof window === "undefined") {
    return null;
  }

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export default LayoutProvider;
