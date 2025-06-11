import { Tag, TagInput } from "emblor";
import React, { FC, useState } from "react";

type ArrayInputFieldProps = {
  setFormData: (data: { [key: string]: any }) => void;
  label: string;
};

const ArrayInputField: FC<ArrayInputFieldProps> = ({ setFormData, label }) => {
  const [chips, setChips] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-[150px_auto] items-center gap-4">
      <label htmlFor="" className="text-primary text-base font-medium">
        {label}
      </label>
      <TagInput
        placeholder="Enter Tld"
        tags={chips}
        setTags={(newTags: any) => {
          setChips(newTags);
          setFormData((prev: any) => ({
            ...prev,
            tld: newTags.map((tag: Tag) => tag.text).join(","),
          }));
        }}
        styleClasses={{
          clearAllButton: "text-primary text-sm font-medium bg-white",
          input: "h-[30px]",
          inlineTagsContainer:
            "px-[10px] py-0 border border-primary-200 rounded-5 ",
          tag: {
            body: "bg-primary-100 text-primary text-sm rounded-10 px-1 h-[25px]",
            closeButton:
              "size-3 border border-primary rounded-full p-0 hover:text-error hover:border-error font-medium ml-2",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
      />
    </div>
  );
};

export default ArrayInputField;
