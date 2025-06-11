"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  const id = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || "";
  const isAvailable = id?.length > 0;

  useEffect(() => {
    if (!isAvailable) return;
    Crisp.configure(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || "");
  }, []);
  return null;
};

export default CrispChat;
