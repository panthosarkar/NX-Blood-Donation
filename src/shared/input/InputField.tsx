import { cn } from "@/library/utils/cn";
import React, { FC } from "react";

const InputField: FC<{
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type, name, id, placeholder, className, value, onChange }) => {
  return (
    <div>
      <label
        htmlFor="fast-name"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}:
      </label>
      <input
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={cn(`input_donation`, !className)}
      />
    </div>
  );
};

export default InputField;
