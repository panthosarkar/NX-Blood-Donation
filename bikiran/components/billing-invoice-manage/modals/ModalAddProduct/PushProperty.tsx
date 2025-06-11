import { TInputChangeEvent } from "@/bik-lib/types/event";
import { AnimatedInputField, AnimatedTextArea } from "@bikiran/inputs";
import React, { FC } from "react";

type TProps = {
  formData: any;
  handleOnChange: (e: TInputChangeEvent) => void;
};

export const PushProperty: FC<TProps> = ({ formData, handleOnChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AnimatedInputField
          label="Number of Subscribers"
          name="subscribers"
          formData={formData}
          onChange={handleOnChange}
        />
        <AnimatedInputField
          label="Validate"
          name="validate"
          formData={formData}
          onChange={handleOnChange}
        />
      </div>
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

export default PushProperty;
