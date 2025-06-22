import { cn } from "@/library/utils/cn";
import React, { FC } from "react";

const selectField: FC<{
  label: string;
  options: string[];
  id: string;
  name: string;
  className?: string;
}> = ({ label, options, id, name, className }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}:
      </label>
      <select id={id} name={name} className={cn(`input_donation`, !className)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default selectField;
