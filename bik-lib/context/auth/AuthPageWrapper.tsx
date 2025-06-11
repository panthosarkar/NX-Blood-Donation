"use client";

import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { TAuthInfo } from "./authTypes";
import { PageLoading } from "@bikiran/utils";

const AuthPageWrapper: React.FC<{
  children: ReactNode;
  authFn: () => { authInfo: TAuthInfo; loginUrl?: string };
}> = ({ children, authFn }) => {
  const router = useRouter();
  const { authInfo, loginUrl } = authFn();
  const auth = authInfo;

  const loginState: boolean | "loading" = auth.loading
    ? "loading"
    : !auth.error;

  useEffect(() => {
    if (loginState === false) {
      router.push(loginUrl as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState]);

  if (loginState === "loading" || loginState === false) {
    return <PageLoading />;
  }

  return <>{children}</>;
};

export default AuthPageWrapper;
