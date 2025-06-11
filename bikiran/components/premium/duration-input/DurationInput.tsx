import { addOption } from "@/bik-lib/utils/option";
import {AnimatedInputField, AnimatedSelect, Select } from "@bikiran/inputs";
import React, { FC } from "react";

type TProps = {
  formData: Record<string, any>;
  option: string[];
  handleChange: (ev: any) => void;
};

const DurationInput: FC<TProps> = ({ formData, option, handleChange }) => {
  const handleDurationChange = (ev: any) => {
    const value = ev.target.value;
    if (!isNaN(value)) {
      handleChange(ev);
    }
  };

  return (
    <div className="grid grid-cols-2 w-full rounded-8 items-center">
      <AnimatedInputField
        formData={formData}
        label="Duration"
        name="contractDuration"
        onChange={handleDurationChange}
        className="[&>input]:rounded-r-none [&>input]:border-r-0 placeholder:text-sm [&>input]:!text-right placeholder:text-[#b4b9b7] placeholder:font-medium"
        placeholder="_"
      />
      <AnimatedSelect
        label=""
        name="contractUnitName"
        placeholder="-"
        containerClassname="[&_.trigger-container]:!rounded-l-none [&_.trigger-container]:!border-l-0"
        className=""
        options={option?.map((i) => addOption(i, i, i)) || []}
        formData={formData}
        onChange={handleChange}
      />
    </div>
  );
};

export default DurationInput;
