import { FC } from "react";
import { Select } from "@bikiran/inputs";
import { addOption } from "@/bik-lib/utils/option";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import dayjs from "dayjs";
import Image from "next/image";

type TProps = {
  icon: string;
  title: string;
  formData: Record<string, any>;
  onChange: (ev: TInputChangeEvent) => void;
};

const options = [
  {
    id: "next",
    title: "Next Month",
  },
  {
    id: "this",
    title: "This Month",
  },
  {
    id: "last",
    title: "Last Month",
  },
  {
    id: "this-year",
    title: `This Year (${dayjs().year()})`,
  },
  {
    id: "last-year",
    title: "Last Year",
  },
];

const ChartHeader: FC<TProps> = ({ icon, title, formData, onChange }) => {
  return (
    <div className="flex justify-between items-center mb-4 pl-6">
      <div className="flex items-center gap-2">
        <div className="size-7">
          <Image
            src={icon}
            alt="alt"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <h2 className="text-lg text-primary-700">{title}</h2>
      </div>

      <Select
        formData={formData}
        label=""
        placeholder=" "
        name="type"
        onChange={onChange}
        containerClassname="w-[180px] [&_.value]:!text-secondary [&_.select-option-placeholder]:hidden"
        className="!border-transparent"
        options={options.map((item: Record<string, any>) =>
          addOption(item.id, item.title, item.id)
        )}
      />
    </div>
  );
};

export default ChartHeader;
