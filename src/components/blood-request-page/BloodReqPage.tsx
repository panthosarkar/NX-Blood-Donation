"use client";
import React, { useState } from "react";
import ReqHeaderSection from "./ReqHeaderSection";
import RequestFormSection from "./RequestFormSection";
import BloodRequestProvider from "./context/BloodRequestProvider";

const BloodReqPage = () => {
  return (
    <BloodRequestProvider>
      <div className="container mx-auto max-w-4xl p-6 md:p-8 my-10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-lg">
        <ReqHeaderSection />
        <RequestFormSection />
      </div>
    </BloodRequestProvider>
  );
};

export default BloodReqPage;
