import { SelectField } from "@/bik-lib/lib/InputFields";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedInputField, AnimatedTextArea, Select } from "@bikiran/inputs";
import React, { FC } from "react";

type TProps = {
  formData: any;
  handleOnChange: (e: TInputChangeEvent) => void;
};

export const SmsProperty: FC<TProps> = ({ formData, handleOnChange }) => {
  const typeOfSms = [
    {
      id: 0,
      title: "select",
    },
    {
      id: 1,
      title: "masking",
    },
    {
      id: 2,
      title: "non-masking",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AnimatedInputField
          label="Validity"
          name="validity"
          formData={formData}
          onChange={handleOnChange}
        />
        <Select
          formData={formData}
          label=""
          className="w-[227px]"
          placeholder="Type of Sms"
          name="sms"
          onChange={handleOnChange}
          options={typeOfSms.map((item) =>
            addOption(item.id, capitalizeFirstLetter(item.title), item.title)
          )}
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

export default SmsProperty;
