import { SelectField } from "@/bik-lib/lib/InputFields";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { addOption } from "@/bik-lib/utils/option";
import React, { FC } from "react";
import { locations, raidLevels } from "./productConstants";
import { AnimatedInputField, AnimatedTextArea, Select } from "@bikiran/inputs";

type TProps = {
  formData: any;
  handleOnChange: (e: TInputChangeEvent) => void;
};

export const ServerDedicatedProperty: FC<TProps> = ({
  formData,
  handleOnChange,
}) => {
  return (
    <div className="space-y-4">
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
        label="Network"
        name="network"
        formData={formData}
        onChange={handleOnChange}
      />
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

      <div className="grid grid-cols-3 gap-2">
        <AnimatedInputField
          label="Server OS"
          name="server-os"
          formData={formData}
          className="mt-1"
          onChange={handleOnChange}
        />
        <AnimatedInputField
          label="Bandwidth"
          name="bandwidth"
          formData={formData}
          className="mt-1"
          onChange={handleOnChange}
        />
        <Select
          formData={formData}
          label=""
          className="flex-shrink-0"
          placeholder="Location"
          name="location"
          onChange={handleOnChange}
          options={locations.map((item) =>
            addOption(item.id, item.title, item.title)
          )}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <AnimatedInputField
          label="IP"
          name="ip"
          formData={formData}
          className=""
          onChange={handleOnChange}
        />
        <AnimatedInputField
          label="Hostname"
          name="hostname"
          formData={formData}
          className=""
          onChange={handleOnChange}
        />
      </div>
      <AnimatedTextArea
        label="Note"
        name="note"
        formData={formData}
        onChange={handleOnChange}
        className="h-25"
      />
    </div>
  );
};
