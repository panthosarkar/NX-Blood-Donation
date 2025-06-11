"use client";
import { FC, useState } from "react";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { ManageApplicationProvider } from "./context/ManageApplicationProvider";
import ApplicationBody from "./components/ApplicationBody";
import ApplicationHeader from "./components/ApplicationHeader";

const ManageApplicationPage: FC = () => {
  const [formData, setFormData] = useState({ text: "" });

  const onChange = (ev: TInputChangeEvent) => {
    setFormData((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
  };

  return (
    <ManageApplicationProvider>
      <div className="w-full flex flex-col max-w-[1400px] mx-5 xl:mx-auto">
        <ApplicationHeader text={formData?.text || ""} onChange={onChange} />
        <ApplicationBody formData={formData} />
      </div>
    </ManageApplicationProvider>
  );
};

export default ManageApplicationPage;
