import { TInputChangeEvent, TState } from "@/bik-lib/types/event";
import { cn } from "@/bik-lib/utils/cn";
import dayjs from "dayjs";
import React, { FC, useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

const FlatPickrComp = Flatpickr as any;

type TProps = {
  inpRef?: React.RefObject<Flatpickr>;
  name: string;
  formData: Record<string, any>;
  setFormData: TState<Record<string, any>>;
  onChange: (e: TInputChangeEvent) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
};

const DateInput: FC<TProps> = ({
  inpRef,
  name,
  formData,
  setFormData,
  disabled,
  className,
  label,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const handelOnChange = (dates: Date[]) => {
    if (dates?.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: dayjs(dates[0]).format("YYYY-MM-DD"),
      }));
    }
  };
  // Custom date formatter for the input display
  const formatDate = (date: Date, format: string) => {
    return dayjs(date).format("DD MMM YYYY");
  };
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

  return (
    <div
      className={cn(
        "grid grid-cols-[150px_auto] [&_.flatpickr-input]:!px-[10px] [&_.flatpickr-wrapper]:w-full [&_.flatpickr-wrapper]:h-[35px] items-center",
        className
      )}
    >
      <label htmlFor="" className="text-base text-primary font-medium">
        {label || "Date"}
      </label>
      <div className="w-full relative border border-primary-100 rounded-md ">
        <FlatPickrComp
          ref={inpRef}
          name={name}
          options={{
            static: true, // Keeps the calendar in place, prevents it from closing on select
            dateFormat: "Y-m-d", // Internal format used by Flatpickr
            altFormat: "d M Y", // Format for the alternative display in Flatpickr
            formatDate, // Use custom formatter for displaying selected dates
          }}
          value={formData[name] ? [formData[name]] : []}
          style={{ backgroundPosition: "center right 10px" }}
          onChange={handelOnChange}
          readOnly={false}
          placeholder="Select Date"
          className={cn(
            "flex-shrink size-full  bg-transparent rounded-lg block outline-none px-2 md:px-3 text-primary text-sm leading-6 font-normal bg-calender bg-no-repeat bg-auto",
            className,
            {
              "grayscale pointer-events-none": disabled,
            }
          )}
        />
      </div>
    </div>
  );
};

export default DateInput;
