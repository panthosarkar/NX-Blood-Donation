"use client";
import { FC } from "react";
import SupportChatProvider from "./context/SupportChatProvider";
import SupportChatBodySection from "./SupportChatBodySection";
import SupportChatHeaderSection from "./SupportChatHeaderSection";

const SupportChatPage: FC = () => {
  return (
    <SupportChatProvider>
      <div className="flex flex-col h-[calc(100vh-80px)] -mt-10">
        <SupportChatHeaderSection />

        {/* Section with Dynamic Layout */}
        <SupportChatBodySection />
      </div>
    </SupportChatProvider>
  );
};

export default SupportChatPage;
