"use client";

import { ReactNode } from "react";
import { TAuthInfo } from "./authTypes";

interface AuthCompWrapperProps {
  children: [ReactNode, ReactNode, ReactNode]; // Expecting exactly 3 children
  auth: TAuthInfo;
}

const AuthCompWrapper = ({ children, auth }: AuthCompWrapperProps) => {
  // 1st child - Login State
  const comp0 = children[0];
  // 2nd child - Not Logged-in State
  const comp1 = children[1];
  // 3rd child - Loading State - Placeholder
  const comp2 = children[2];

  if (auth.loading) {
    return comp2;
  }

  if (!auth.error) {
    return comp0;
  }

  return comp1;
};

export default AuthCompWrapper;
