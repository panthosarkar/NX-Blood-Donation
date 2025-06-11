import { TInputChangeEvent } from "@/bik-lib/types/event";
import { DateInputField } from "@bikiran/inputs";
import React, { useState } from "react";

const Test = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <DateInputField
        formData={formData}
        name="date"
        onChange={handleChange}
        className="h-[45px] bg-white"
      />
    </div>
  );
};

export default Test;
