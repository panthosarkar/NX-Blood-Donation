"use client";
import { useTemplate } from "@/src/contexts/template/TemplateProvider";
import { AuthContextType } from "@/src/contexts/types/auth-type";
import React from "react";

import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
  useAuth(): AuthContextType;
}

export const AuthWrapper = ({ children, useAuth }: AuthWrapperProps) => {
  const { openModal } = useTemplate();
  const { isAuthorized } = useAuth();

  if (isAuthorized) {
    return <>{children}</>;
  }
  return (
    <div role="button" tabIndex={-1} onClick={() => openModal("user-login-required-modal")} className="cursor-pointer">
      <div className="pointer-events-none">{children}</div>
    </div>
  );
};
