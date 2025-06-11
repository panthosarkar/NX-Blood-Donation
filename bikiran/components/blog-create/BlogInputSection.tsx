import { assetKeys } from "@/bik-lib/lib/assets";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { addOption } from "@/bik-lib/utils/option";
import { InputField, Select } from "@bikiran/inputs";
import React, { FC } from "react";

type TProps = {
  formData: Record<string, any>;
  handleChange: (e: TInputChangeEvent) => void;
};
const BlogInputSection: FC<TProps> = ({ formData, handleChange }) => {
  const assetKeysArray = Object.values(assetKeys);
  return (
    <div className="space-y-3">
      <InputField
        formData={formData}
        label={"Title"}
        placeholder="Your Title Goes Here"
        name="title"
        onChange={handleChange}
      />
      <InputField
        formData={formData}
        label={"Subtitle"}
        name="subtitle"
        placeholder="Your Subtitle Goes Here"
        onChange={handleChange}
      />
      <Select
        formData={formData}
        label={"Select Category"}
        name="category"
        placeholder="Select Category"
        onChange={handleChange}
        options={
          assetKeysArray?.map((item) => addOption(item, item, item)) || []
        }
      />
    </div>
  );
};

export default BlogInputSection;
