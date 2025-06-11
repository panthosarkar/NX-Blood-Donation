"use client";
import { AuthContextType } from "@/src/contexts/types/auth-type";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

interface AuthPageWrapperProps {
  children: ReactNode;
  authFn: AuthContextType;
}

const AuthPageWrapper = ({ children, authFn }: AuthPageWrapperProps) => {
  const { push } = useRouter();

  useEffect(() => {
    if (authFn.isAuthorized === false && authFn.authStateLoading === false) {
      const urlEncode = encodeURIComponent(window.location.pathname || "");
      push(`/login?redirect=${urlEncode}`);
    }
  }, [authFn.authStateLoading, authFn.isAuthorized]);

  if (authFn.isAuthorized === false && Object.keys(authFn.authInfo).length === 0 && authFn.authStateLoading === true) {
    return;
    {
      /* Loading component can be customized as needed */
    }
  }

  if (authFn.isAuthorized === true && Object.keys(authFn.authInfo).length > 0 && authFn.authStateLoading === false) {
    return <>{children}</>;
  }

  return null;
};

export default AuthPageWrapper;
