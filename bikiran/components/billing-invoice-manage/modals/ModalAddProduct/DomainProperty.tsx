import { TInputChangeEvent } from "@/bik-lib/types/event";
import { AnimatedTextArea, ValidationInputField } from "@bikiran/inputs";
import React, { FC } from "react";
type TProps = {
  formData: Record<string, any>;
  handleOnChange: (e: TInputChangeEvent) => void;
};
const DomainProperty: FC<TProps> = ({ formData, handleOnChange }) => {
  return (
    <div className="space-y-3">
      <ValidationInputField
        label="Domain"
        name="domain"
        formData={formData}
        onChange={handleOnChange}
      />
      <AnimatedTextArea
        label="Note"
        name="note"
        formData={formData}
        onChange={handleOnChange}
        className="h-28"
      />
    </div>
  );
};

export default DomainProperty;
