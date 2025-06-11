"use client";
import { FC } from "react";
import SupportAdminDataProvider from "./context/SupportAdminDataProvider";
import SupportAdminTableSection from "./SupportAdminTableSection";

const SupportAdminPage: FC = () => {
  return (
    <SupportAdminDataProvider>
      <div className="admin-section">
        <SupportAdminTableSection />
      </div>
    </SupportAdminDataProvider>
  );
};

export default SupportAdminPage;
