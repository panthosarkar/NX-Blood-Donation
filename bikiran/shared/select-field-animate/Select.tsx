import { cn } from "@/bik-lib/utils/cn";
import { FC, useState } from "react";
import { useEffect, useRef } from "react";
import { ArrowIcon, CheckIcon } from "./Icons";
import style from "./Select.module.css";
import SelectOptionArea from "./SelectOptionArea";

type TProps = {
  name: string;
  onChange: (value: any) => void;
  formData: Record<string, any>;
  options: TSelectOption[];
  placeholder?: string;
  className?: string;
  containerClassname?: string;
  label: string;
};

type TSelectOption = {
  id: number;
  title: string;
  value: string;
};

const Select: FC<TProps> = ({
  name,
  onChange,
  formData,
  label,
  options,
  placeholder,
  containerClassname,
  className,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleSelect = (val: any) => {
    setShow((prev) => !prev);
    const ev = {
      target: {
        name,
        value: val,
      },
    };
    onChange(ev);
  };

  const isValue = formData[name]?.length > 0;
  const value = isValue
    ? options.find((option) => option.value === formData[name])?.title
    : placeholder;

  return (
    <div ref={ref} className={containerClassname}>
      <div
        className={cn("container select-field-cont", style.container)}
        role="selectField"
      >
        <div
          className={cn(
            "valueWrapper relative border-[#e5e7eb]",
            style.valueWrapper,
            isValue ? style.isValue : "",
            className,
            {
              "!border-secondary": show,
            }
          )}
          onClick={() => setShow((prev) => !prev)}
        >
          <div className={cn("value", style.value)}>{isValue && value}</div>
          <div className={cn(style.iconWrapper, "iconWrapper")}>
            <ArrowIcon />
          </div>

          <div
            className={cn(
              "text-[#b9b7c6] top-1/2 transform -translate-y-1/2",
              style.placeholder,
              {
                "-top-3 transform-none": isValue,
                "text-secondary": show,
              }
            )}
          >
            {placeholder}
          </div>
        </div>
        <SelectOptionArea
          options={options}
          handleSelect={handleSelect}
          formData={formData}
          name={name}
          show={show}
          isValue={isValue}
          placeholder={placeholder}
          isModal
        />
      </div>
    </div>
  );
};

export default Select;
