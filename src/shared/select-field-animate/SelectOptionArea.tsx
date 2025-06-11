import { cn } from "@/bik-lib/utils/cn";
import { CheckIcon } from "./Icons";
import { FC, useEffect, useState } from "react";
import style from "./Select.module.css";

type TSelectOption = {
  id: number;
  title: string;
  value: string;
};

export const addOption = (id: any, title: any, value: any) => {
  return { id, title, value };
};

const Option: FC<{
  option: TSelectOption;
  isActive: boolean;
  handleSelect: (val: any) => void;
}> = ({ option, isActive, handleSelect }) => {
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
          {isActive && <CheckIcon />}
        </div>
        {option.title}
      </div>
    </div>
  );
};

const SelectOptionArea: FC<{
  options: TSelectOption[];
  handleSelect: (val: any) => void;
  formData: Record<string, any>;
  name: string;
  show: boolean;
  isValue: boolean;
  placeholder?: string;
  isModal?: boolean;
}> = ({
  options,
  handleSelect,
  formData,
  name,
  show,
  isValue,
  placeholder,
  isModal = false,
}) => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    translateY: number | undefined;
    translateX: number | undefined;
    width: number;
  }>({
    top: 0,
    left: 0,
    translateY: undefined,
    translateX: undefined,
    width: 0,
  });
  //   console.log(position, "position");
  useEffect(() => {
    // get position from id #selectField

    const selectField = document.querySelector(".select-field-cont");
    const modalPosition = document.querySelector('[role="dialog"]');

    const selectFieldRect = selectField?.getBoundingClientRect();
    const modalPositionRect = modalPosition?.getBoundingClientRect();

    if (selectFieldRect) {
      if (isModal && modalPositionRect) {
        const top = modalPositionRect.top - selectFieldRect.height - 30;
        const left = modalPositionRect.left - 2;

        setPosition({
          top: -top,
          left: -left,
          translateY: selectFieldRect.top,
          translateX: selectFieldRect.left,
          width: selectFieldRect.width + 20,
        });
      } else {
        const top = selectFieldRect?.top + selectFieldRect.height;
        setPosition({
          top: top,
          left: selectFieldRect.left,
          translateY: undefined,
          translateX: undefined,
          width: selectFieldRect.width + 20,
        });
      }
    }
  }, []);
  //   console.log(position, "position");
  return (
    <div
      className={cn(
        "select-option-container",
        style.selectOptionContainer,
        style.customScrollbar,
        show ? `${style.show}  show` : ""
      )}
      style={{
        width: position?.width,
        top: position?.top,
        left: position?.left,
        transform:
          position.translateY !== undefined && position.translateX !== undefined
            ? `translate(${position.translateX}px, ${position.translateY}px)`
            : "none",
      }}
    >
      <div className={cn(style.placeholderContainer, "placeholderContainer")}>
        <div
          className={cn(
            "select-option-placeholder",
            style.selectOptionPlaceholder,
            !isValue ? `${style.notIsValue} notIsValue` : ""
          )}
          onClick={() => handleSelect("")}
        >
          <div className={cn(style.checkIcon, "checkIcon")}>
            {!isValue && <CheckIcon />}
          </div>
          {placeholder || "Select an option"}
        </div>
        {options?.map((option: TSelectOption) => {
          const isActive: boolean = formData?.[name] === option?.value;
          return (
            <Option
              key={option.id}
              option={option}
              isActive={isActive}
              handleSelect={handleSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelectOptionArea;
