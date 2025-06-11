"use client";
import { StickyProvider } from "@/src/contexts/StickyProvider";
import React from "react";
import { LayoutWeb } from "./layout-web/LayoutWeb";
import LoginModal from "../auth/modals/LoginModal";
import { ModalRegistration } from "../auth/modals/ModalRegistration";
import { SIZE_LG, useLayout } from "@/src/contexts/LayoutProvider";

export const MainNavbar = () => {
  const { windowWidth } = useLayout();

  return (
    <StickyProvider>
      {windowWidth > SIZE_LG ? <LayoutWeb /> : null}

      <LoginModal />
      <ModalRegistration />
    </StickyProvider>
  );
};
