"use client";
import React, { FC } from "react";

import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import CurrencyConfTableSection from "./CurrencyConfTableSection";
import { CurrencyConfProvider } from "./context/CurrencyConfProvider";
import CurrencyConfHeaderSection from "./CurrencyConfHeaderSection";

const CurrencyConfPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { authInfo } = useAuth2();

  return (
    <CurrencyConfProvider query={query}>
      <div className="admin-section">
        <CurrencyConfHeaderSection />
        <CurrencyConfTableSection />
      </div>
    </CurrencyConfProvider>
  );
};

export default CurrencyConfPage;
