/* eslint-disable no-unused-vars */
import { FC, useEffect, useRef, useState } from "react";
import { cn } from "@/bik-lib/utils/cn";
import { TInputChangeEvent, TState } from "../types/event";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/bikiran/components/ui/select";
import dayjs from "dayjs";
import Image from "next/image";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import iconUser from "./lib-icons/icon-user.svg";
import { Loader2 } from "lucide-react";
import iconTick from "./lib-icons/icon-tick.svg";
import iconAlert from "./lib-icons/icon-alert-red.svg";
import { evaluate } from "../utils/math";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { SelectIcon } from "@radix-ui/react-select";

const FlatPickrComp = Flatpickr as any;

const passwordTypeIcons: {
  [key: string]: string;
} = {
  account: iconUser,
};

type TPassword = "account";

// Define the prop types for InputField component
type TInputField = {
  label: any;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  name: string;
  formData: Record<string, any>;
  onChange: (e: TInputChangeEvent | any) => void;
  onBlur?: (e: TInputChangeEvent) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean | undefined;
  valid?: boolean | undefined;
  show?: boolean;
  unit?: string;
};

type TAnimateInputField = TInputField & {
  passwordType?: TPassword;
  calculate?: boolean;
  currency?: string;
  readOnly?: boolean;
  required?: boolean;
};

// Define the prop types for InputDate component
type TInputDateProps = {
  name: string;
  formData: Record<string, any>;
  onChange: (e: TInputChangeEvent) => void;
  options?: Record<string, any>;
  disabled?: boolean;
  className?: string;
};

// Define the prop types for InputDateRange component
type TInputDateRangeProps = {
  inpRef?: React.RefObject<Flatpickr>;
  name: string;
  formData: Record<string, any>;
  onChange: (e: TInputChangeEvent) => void;
  disabled?: boolean;
  className?: string;
};

type TSelectOption = {
  id: number;
  icon?: string;
  title: string;
  value: string;
};

const ValidationCheck: FC<{
  show: boolean | undefined;
  loading?: boolean | undefined;
  valid?: boolean | undefined;
  className?: string;
}> = ({ show, loading, valid, className }) => {
  if (!show) return null;
  return (
    <div className={cn("absolute", className)}>
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        loading !== undefined && (
          <Image
            src={valid ? iconTick : iconAlert}
            alt="valid-check"
            width={16}
            height={16}
          />
        )
      )}
    </div>
  );
};

const PasswordEyeIcon: FC<{
  show: boolean;
  showPassword: boolean;
  setShowPassword: TState<boolean>;
}> = ({ show, showPassword, setShowPassword }) => {
  if (!show) return null;
  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={() => setShowPassword((st) => !st)}
      className="absolute h-4 w-4 top-1/2 right-2 transform -translate-y-1/2 text-primary-700 select-none outline-none focus:outline-none opacity-70"
    >
      <Image
        src={
          showPassword
            ? "https://files.bikiran.com/assets/images/icon/icon-pass-show.svg"
            : "https://files.bikiran.com/assets/images/icon/icon-pass-hide.svg"
        }
        alt="eye"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
      />
    </button>
  );
};

// InputField component with TS types
// export const InputField: FC<
//   TInputField & {
//     passwordType?: TPassword;
//   }
// > = ({
//   label,
//   type,
//   placeholder = "",
//   name,
//   autoComplete = "off",
//   formData,
//   onChange,
//   onBlur,
//   className = "",
//   disabled = false,
//   passwordType,
//   loading,
//   valid,
//   show,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div>
//       <label className="text-base font-medium text-primary">{label}</label>
//       <div className="w-full h-[45px] relative">
//         {passwordType && passwordType.length > 0 && (
//           <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
//             <div className="w-7">
//               <Image
//                 src={passwordTypeIcons[passwordType]}
//                 alt={passwordType}
//                 width={0}
//                 height={0}
//                 sizes="100vw"
//                 className="w-full h-auto"
//               />
//             </div>
//           </div>
//         )}
//         <input
//           type={showPassword ? "text" : type}
//           name={name}
//           value={formData[name] || ""}
//           onChange={onChange}
//           onBlur={onBlur}
//           autoComplete={autoComplete}
//           placeholder={placeholder}
//           disabled={disabled}
//           className={cn(
//             "block w-full h-full px-2.5 mt-1 border rounded-[8px] text-base outline-none disabled:grayscale",
//             className,
//             {
//               "pr-10": type === "password",
//               "pl-11": passwordType && passwordType.length > 0,
//             }
//           )}
//         />

//         <PasswordEyeIcon
//           show={type === "password"}
//           showPassword={showPassword}
//           setShowPassword={setShowPassword}
//         />
//         <ValidationCheck
//           show={show}
//           loading={loading}
//           valid={valid}
//           className="top-1/2 -mt-0.5 right-2 flex items-center space-x-2 transform -translate-y-1/2"
//         />
//       </div>
//     </div>
//   );
// };

// InputField component with TS types
export const InputTextareaField: FC<TInputField> = ({
  label,
  placeholder = "",
  name,
  formData,
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <div>
      <label className="text-base font-medium text-primary">{label}</label>
      <div className="w-full h-auto">
        <textarea
          name={name}
          value={formData[name]}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "block w-full h-full px-2.5 py-2.5 mt-1 border rounded-[8px] text-base outline-none disabled:grayscale",
            className
          )}
        />
      </div>
    </div>
  );
};

// Select Field component with TS types
export const SelectField: FC<
  TInputField & {
    options: TSelectOption[];
    parentClassName?: string;
  }
> = ({
  options,
  label,
  placeholder = "",
  name,
  formData,
  onChange,
  className = "",
  disabled = false,
  parentClassName,
}) => {
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
    <div className={cn("", parentClassName)}>
      <label className="text-base font-medium text-primary">{label}</label>
      <div className="w-full h-auto mt-1 wrapper">
        <Select
          defaultValue={formData[name] || ""}
          value={formData[name] || ""}
          onValueChange={(v) => handleOnChange(v)}
        >
          <SelectTrigger
            className={cn(
              `w-full focus:!ring-0 focus:!ring-offset-0 border border-[#d0cfd9] focus-visible:outline-none h-[45px] `,
              className,
              {
                "bg-primary-100 pointer-events-none": disabled,
                "text-primary-500": formData[name]?.length < 2,
              }
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key={placeholder} value=" ">
              <div className="">{placeholder || "Select an option"}</div>
            </SelectItem>
            {options.map((option: TSelectOption) => (
              <SelectItem key={option.id} value={option.value}>
                <div className="flex items-center gap-2">
                  {option.icon ? (
                    <div className="size-4.5">
                      <Image
                        src={option.icon}
                        alt="alt"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto"
                      />
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

export const InputDate: FC<TInputDateProps> = ({
  name,
  formData,
  onChange,
  disabled = false,
  className = "",
}) => {
  const [date, setDate] = useState<Date | null>(null);

  // Sync the local state with formData when it changes
  useEffect(() => {
    setDate(formData[name] ? new Date(formData[name]) : null);
  }, [formData[name]]);

  const handleDateChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
    const event = {
      target: {
        name,
        value: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : "",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <div
      className={cn("", className, {
        "pointer-events-none opacity-50": disabled,
      })}
    >
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select Date"
        disabled={disabled}
        wrapperClassName="size-full"
        className="react-datepicker-input size-full bg-transparent rounded-8 block outline-none border px-2 md:px-3 text-primary text-sm leading-6 font-normal"
      />
    </div>
  );
};

// InputDateRange component with TS types
export const InputDateRange: React.FC<
  TInputDateRangeProps & {
    setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  }
> = ({ inpRef, name, formData, setFormData, disabled, className }) => {
  const handelOnChange = (e: Date[]) => {
    if (e?.length === 2) {
      setFormData((prev) => ({
        ...prev,
        dateStart: dayjs(e[0]).format("YYYY-MM-DD"),
        dateEnd: dayjs(e[1]).format("YYYY-MM-DD"),
      }));
    }
  };

  // Custom date formatter for the input display
  const formatDate = (date: Date, format: string) => {
    return dayjs(date).format("DD MMM YYYY");
  };

  return (
    <FlatPickrComp
      ref={inpRef}
      name={name}
      options={{
        mode: "range",
        static: true, // Keeps the calendar in place, prevents it from closing on select
        dateFormat: "Y-m-d", // Internal format used by Flatpickr
        altFormat: "d M Y", // Format for the alternative display in Flatpickr
        formatDate, // Use custom formatter for displaying selected dates
      }}
      value={[formData?.dateStart, formData?.dateEnd]}
      style={{ backgroundPosition: "center right 10px" }}
      onChange={handelOnChange}
      readOnly={false}
      placeholder="Select Date"
      className={cn(
        "flex-shrink size-full bg-transparent rounded-lg block outline-none border border-neutral-900 border-opacity-20 px-2 md:px-3 text-primary text-sm leading-6 font-normal bg-calender bg-no-repeat bg-auto",
        className,
        {
          "grayscale pointer-events-none": disabled,
        }
      )}
    />
  );
};

// InputField component with TS types
export const AnimateInputField: FC<TAnimateInputField> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const {
    label,
    type = "text",
    placeholder = "",
    autoComplete = "off",
    calculate = false,
    name,
    formData,
    onChange,
    onBlur,
    className = "",
    disabled = false,
    passwordType,
    loading,
    valid,
    show,
    required = false,
    unit,
    currency,
    readOnly,
  } = props;

  const handleFocus = () => {
    if (!disabled && ref.current) {
      ref.current.focus();
      setFocused(true);
    }
  };

  const handleBlur = (ev: TInputChangeEvent) => {
    if (onBlur) {
      onBlur(ev);
    }
    if (ref.current) {
      setFocused(false);
    }
  };

  const handleChange = (ev: TInputChangeEvent) => {
    if (!calculate) {
      return onChange(ev);
    }

    const calculatedValue = evaluate(ev.target.value);
    onChange({
      target: {
        name: ev.target.name,
        value: calculatedValue,
      },
    });
  };

  // Focus the input when `focused` is set to true
  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
    }
  }, [focused]);

  const inputValue = formData[name] ?? "";
  const isValue = inputValue !== "";

  return (
    <div className="animate-input w-full">
      <div
        className={cn("w-full h-[45px] relative overflow-visible", className)}
        onClick={handleFocus}
      >
        <label
          className={cn(
            "text-sm font-medium text-primary-300 leading-5 bg-white absolute top-1/2 left-2.5 -translate-y-1/2 transition-all duration-300 focus:bg-white",
            {
              "-top-2 left-4 translate-x-0 translate-y-0": focused || isValue,
              "text-secondary-700": focused,
            }
          )}
        >
          {label || "Type something"}
          {required && <span className="text-error opacity-75">*</span>}
        </label>
        <input
          ref={ref}
          type={showPassword ? "text" : type}
          required={required}
          name={name}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(
            "block w-full h-full px-2.5 caret-white border rounded-[8px] text-base outline-none disabled:grayscale transition-colors",
            {
              "border-secondary-700 caret-current": focused,
              "pr-10": type === "password",
              "pr-12": unit,
              "pl-11": passwordType && passwordType.length > 0,
            }
          )}
        />

        {/* Password visibility toggle */}
        <PasswordEyeIcon
          show={type === "password" && (focused || isValue) && !disabled}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {/* Loading and validation icons */}
        <ValidationCheck
          show={show}
          loading={loading}
          valid={valid}
          className="top-1/2 right-2 flex items-center space-x-2 transform -translate-y-1/2"
        />

        {/* Currency and unit */}
        {currency && (focused || isValue) && !disabled && (
          <div className="absolute top-1/2 right-2 flex items-center space-x-2 transform -translate-y-1/2">
            <div className="text-[10px] text-primary-700">
              {unit && currency ? `${currency}/${unit}` : unit || currency}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AnimateTextArea: FC<TInputField> = (props) => {
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const {
    label,
    type = "text",
    name,
    formData,
    onChange,
    className = "",
    disabled = false,
    onBlur,
  } = props;

  const handleFocus = () => {
    if (!disabled && ref.current) {
      ref.current.focus();
      setFocused(true);
    }
  };

  const handleBlur = () => {
    if (ref.current) {
      setFocused(false);
    }
  };

  // Focus the input when `focused` is set to true
  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
    }
  }, [focused]);

  const isValue =
    typeof formData?.[name] === "number"
      ? formData?.[name] > 0
      : formData?.[name]?.length > 0;

  return (
    <div className="animate-input">
      <div
        className={cn("w-full h-[45px] relative overflow-visible", className)}
        onClick={() => setFocused(true)}
      >
        <label
          className={cn(
            "text-sm font-medium text-primary-700 bg-white absolute top-[15px] left-2.5 -translate-y-1/2 transition-all duration-300",
            {
              "-top-2 left-4 translate-x-0 translate-y-0":
                (focused || isValue) && !disabled,
              "text-secondary-700": focused,
            }
          )}
        >
          {label || "Type something"}
        </label>
        <textarea
          ref={ref}
          name={name}
          value={formData[name] || ""}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn(
            "block w-full h-full p-2.5 caret-white border rounded-[8px] text-base outline-none disabled:grayscale transition-colors",
            {
              "border-secondary-700 caret-current": focused,
              "pr-10": type === "password",
            }
          )}
        />
      </div>
    </div>
  );
};
