import { FC, useState } from "react";
import { ArrowIcon, CheckIcon } from "./Icons";
import style from "./Select.module.css";
import { useEffect, useRef } from "react";
import { cn } from "@/library/utils/cn";

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

export const addOption = (id: any, title: any, value: any) => {
  return { id, title, value };
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
      <div>
        <label className={cn(style.label)}>{label}</label>
      </div>
      <div className={cn("container", style.container)}>
        <div
          className={cn(
            "valueWrapper",
            style.valueWrapper,
            isValue ? style.isValue : "",
            className
          )}
          onClick={() => setShow((prev) => !prev)}
        >
          <div
            className={cn(
              "value",
              value === placeholder ? style.placeholder : style.value
            )}
          >
            {value}
          </div>
          <div className={cn(style.iconWrapper, "iconWrapper")}>
            <ArrowIcon />
          </div>
        </div>
        <div
          className={cn(
            "select-option-container",
            style.selectOptionContainer,
            style.customScrollbar,
            show ? `${style.show}  show` : ""
          )}
        >
          <div
            className={cn(style.placeholderContainer, "placeholderContainer")}
          >
            <div
              className={cn(
                "select-option-placeholder",
                style.selectOptionPlaceholder,
                !isValue ? `${style.notIsValue} notIsValue` : ""
              )}
              onClick={() => handleSelect("")}
            >
              <div className={cn(style.checkIcon, "checkIcon")}>
                {!isValue && <CheckIcon className="text-primary" />}
              </div>
              {placeholder || "Select an option"}
            </div>
            {options.map((option: TSelectOption) => {
              const isActive: boolean = formData[name] === option.value;
              return (
                <div
                  key={option.id}
                  className={cn(
                    "select-option",
                    style.selectOption,
                    isActive ? `${style.isActive} isActive` : ""
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <div className={cn(style.optionTitle, "optionTitle")}>
                    <div className={cn(style.checkIcon, "checkIcon")}>
                      {isActive && <CheckIcon className="text-primary" />}
                    </div>
                    {option.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
