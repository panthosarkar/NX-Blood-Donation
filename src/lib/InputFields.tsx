/* eslint-disable no-unused-vars */
import { FC, useState } from "react";
import { TInputChangeEvent } from "../types/event";
import dayjs from "dayjs";
import "flatpickr/dist/themes/material_green.css";
import { Search } from "lucide-react";
import Flatpickr from "react-flatpickr";
import { cn } from "../utils/cn";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const FlatpickrComponent = Flatpickr as any;

// Define the prop types for InputField component
type TInputFieldProps = {
  label?: any;
  type?: "text" | "password" | "email" | "number" | "tel" | "date" | "time" | "file" | "datetime-local";
  placeholder?: string;
  name: string;
  formData: Record<string, any>;
  onChange: (e: TInputChangeEvent | any) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  [key: string]: any;
};

// Define the prop types for InputDate component
type TInputDateProps = {
  label?: string;
  name: string;
  formData: Record<string, any>;
  onChange: (e: TInputChangeEvent) => void;
  options?: Record<string, any>;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

// Define the prop types for InputDateRange component
type TInputDateRangeProps = {
  label?: string;
  inpRef?: React.RefObject<Flatpickr>;
  name: string;
  formData: Record<string, any>;
  onChange: (e: TInputChangeEvent) => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

type TSelectOption = {
  id: number;
  icon?: string;
  title: string;
  value: string;
};

// InputField component with TS types
export const InputField: FC<TInputFieldProps> = ({
  label,
  type = "text",
  placeholder = "",
  name,
  formData,
  onChange,
  className = "",
  disabled = false,
  required = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <label className="text-primary text-base font-normal">
        {label}

        {required && <span className="text-red-600">&nbsp;*</span>}
      </label>
      <div className="relative h-[45px] w-full">
        <input
          type={showPassword ? "text" : type}
          name={name}
          value={formData[name] || ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "mt-1 block h-full w-full overflow-hidden rounded-[8px] border px-2.5 text-base font-normal text-ellipsis outline-none disabled:bg-neutral-100 disabled:grayscale",
            className,
          )}
          {...rest}
        />
        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((st) => !st)}
            className="text-primary-700 absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform cursor-pointer opacity-70 outline-none select-none focus:outline-none"
          >
            <img
              src={showPassword ? "https://files.src.com/assets/images/icon/icon-pass-show.svg" : "https://files.src.com/assets/images/icon/icon-pass-hide.svg"}
              alt="eye"
              sizes="100vw"
              className="h-auto w-full"
            />
          </button>
        )}
      </div>
    </div>
  );
};

// InputField component with search icon
export const InputFieldSearch: FC<TInputFieldProps> = ({ name, label, onChange, onKeyUp, formData, placeholder = "", className = "" }) => {
  return (
    <div className={cn(`border- flex h-10 w-full flex-row items-center justify-between gap-x-2 overflow-hidden rounded-lg border px-1 md:px-3`, className)}>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={onChange}
        onKeyUp={onKeyUp}
        placeholder={placeholder || label}
        autoComplete="off"
        className="text-primary block h-full w-[calc(100%_-_28px)] border-none text-xs leading-6 font-normal outline-none md:text-sm"
      />
      <button type="button" className="text-primary-700 inline-block w-5 min-w-min" aria-label="Loading...">
        <Search className="size-full" />
      </button>
    </div>
  );
};

// InputField component with TS types
export const InputTextareaField: FC<Omit<TInputFieldProps, "type">> = ({
  label,
  placeholder = "",
  name,
  formData,
  onChange,
  className = "",
  disabled = false,
  required = false,
  ...rest
}) => {
  return (
    <div className="w-full">
      {label && ( // label is optional
        <label className="text-primary text-base font-normal">
          {label}
          {required && <span className="text-red-600">&nbsp;*</span>}
        </label>
      )}
      <div className="h-auto w-full">
        <textarea
          name={name}
          value={formData[name]}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn("mt-1 block h-full w-full rounded-[8px] border px-2.5 py-2.5 text-base outline-none disabled:grayscale", className)}
          {...rest}
        />
      </div>
    </div>
  );
};

// Select Field component with TS types
export const SelectField: FC<
  TInputFieldProps & {
    options: TSelectOption[];
  }
> = ({ options, label, placeholder = "", name, formData, onChange, className = "", disabled = false, required = false }) => {
  const handleOnChange = (v: string) => {
    // Avoid triggering `onChange` unnecessarily
    if (v.length > 0) {
      onChange({
        target: {
          name: name,
          value: v,
        },
      });
    }
  };

  return (
    <div className="w-full">
      <label className="text-primary mb-2 text-base font-normal">
        {label}
        {required && <span className="text-red-600">&nbsp;*</span>}
      </label>
      <div className="mt-1 h-auto w-full">
        <Select defaultValue={formData[name] || ""} value={formData[name] || ""} onValueChange={(v) => handleOnChange(v)}>
          <SelectTrigger
            className={cn(`h-[45px] w-full shadow-none focus:!ring-0 focus:!ring-offset-0 focus-visible:outline-none`, className, {
              "bg-primary-100 pointer-events-none": disabled,
            })}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option: TSelectOption) => (
              <SelectItem key={option.id} value={option.value}>
                <div className="flex items-center gap-2">
                  {option.icon ? (
                    <div className="size-4.5">
                      <img src={option.icon} alt="alt" className="h-auto w-full" />
                    </div>
                  ) : null}
                  {option.title}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

// InputDate component with TS types
export const InputDate: FC<TInputDateProps> = ({ label, name, formData, onChange, disabled = false, options = {}, className = "", required = false }) => {
  const value = (): string => {
    if (formData[name]) {
      if (formData[name] && typeof formData[name] === "number") {
        return dayjs(formData[name] * 1000).format("YYYY-MM-DD");
      }
      return dayjs(formData[name]).format("YYYY-MM-DD");
    }
    return dayjs().format("YYYY-MM-DD");
  };

  const handleOnChange = ([date]: Date[]) => {
    const ev = {
      target: {
        name,
        value: date ? dayjs(date).format("YYYY-MM-DD") : "",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(ev);
  };

  return (
    <div className={cn("w-full", className)}>
      <label className="text-primary text-base font-normal">
        {label}

        {required && <span className="text-red-600">&nbsp;*</span>}
      </label>
      <div className="mt-1 h-auto w-full [&>div]:w-full">
        <FlatpickrComponent
          name={name}
          options={{
            dateFormat: "Y-m-d",
            static: true,
            ...options,
          }}
          value={value()}
          onChange={handleOnChange}
          readOnly={false}
          placeholder="Select Date"
          className={cn(
            "border-opacity-20 text-primary block h-[45px] w-full flex-shrink rounded-lg border border-neutral-900 bg-transparent px-2 text-sm leading-6 font-normal outline-none md:px-3",
            { "pointer-events-none grayscale": disabled },
          )}
        />
      </div>
    </div>
  );
};

// InputDateRange component with TS types
export const InputDateRange: FC<TInputDateRangeProps> = ({ label, inpRef, name, formData, onChange, disabled = false, className = "", required = false }) => {
  const handleOnChange = (e: Date[]) => {
    if (e?.length === 2) {
      const ev = {
        target: {
          name,
          value: {
            dateStart: dayjs(e[0]).format("YYYY-MM-DD") || "",
            dateEnd: dayjs(e[1]).format("YYYY-MM-DD") || "",
          },
        },
      };
      onChange(ev as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div>
      <label className="text-primary text-base font-normal">
        {label}

        {required && <span className="text-red-600">&nbsp;*</span>}
      </label>
      <FlatpickrComponent
        ref={inpRef}
        name={name}
        options={{ mode: "range", position: "auto left" }}
        value={[formData?.[name]?.dateStart, formData?.[name]?.dateEnd]}
        onChange={handleOnChange}
        readOnly={false}
        placeholder="Select Date"
        className={cn(
          "border-opacity-20 text-primary mt-1 block h-10 w-full flex-shrink rounded-lg border border-neutral-900 bg-transparent px-2 text-sm leading-6 font-normal outline-none md:px-3",
          className,
          { "pointer-events-none grayscale": disabled },
        )}
      />
    </div>
  );
};
