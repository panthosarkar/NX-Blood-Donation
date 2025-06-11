import { SelectField } from "@/bik-lib/lib/InputFields";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import React, { FC } from "react";
import { raidLevels } from "./productConstants";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedInputField, AnimatedTextArea, Select } from "@bikiran/inputs";

type TProps = {
  formData: any;
  handleOnChange: (e: TInputChangeEvent) => void;
};

export const ServerVpsProperty: FC<TProps> = ({ formData, handleOnChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        <AnimatedInputField
          label="CPU"
          name="cpu"
          formData={formData}
          onChange={handleOnChange}
        />
        <AnimatedInputField
          label="RAM"
          name="ram"
          formData={formData}
          onChange={handleOnChange}
        />
        <AnimatedInputField
          label="Storage"
          name="storage"
          formData={formData}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex justify-between items-center gap-2">
        <AnimatedInputField
          label="Network"
          name="network"
          formData={formData}
          onChange={handleOnChange}
        />
        <AnimatedInputField
          label="Server OS"
          name="server-os"
          formData={formData}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <AnimatedInputField
          label="Network"
          name="network"
          formData={formData}
          className="mt-1"
          onChange={handleOnChange}
        />
        <Select
          formData={formData}
          label=""
          className="w-[227px]"
          placeholder="Raid"
          name="duration"
          onChange={handleOnChange}
          options={raidLevels.map((item) =>
            addOption(item.id, item.title, item.title)
          )}
        />
      </div>
      <div className="flex justify-between items-center gap-2">
        <AnimatedInputField
          label="IP"
          name="ip"
          formData={formData}
          onChange={handleOnChange}
        />
        <AnimatedInputField
          label="Hosting"
          name="hosting"
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
