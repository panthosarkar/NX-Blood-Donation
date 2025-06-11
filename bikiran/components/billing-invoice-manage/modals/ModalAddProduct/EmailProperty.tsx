import { TInputChangeEvent } from "@/bik-lib/types/event";
import { AnimatedInputField, AnimatedTextArea } from "@bikiran/inputs";
import React, { FC } from "react";

type TProps = {
  formData: Record<string, any>;
  handleOnChange: (e: TInputChangeEvent) => void;
};
const EmailProperty: FC<TProps> = ({ formData, handleOnChange }) => {
  return (
    <div className="space-y-4">
      <AnimatedInputField
        label="Validate"
        name="validate"
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

export default EmailProperty;
