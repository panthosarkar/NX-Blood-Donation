import { TInputChangeEvent } from "@/bik-lib/types/event";
import { cn } from "@/bik-lib/utils/cn";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import iconDotLine from "./icon-vertical-dot-fill.svg";
import "flatpickr/dist/themes/material_green.css";

type TProps = {
  inpRef?: React.RefObject<Flatpickr>;
  name: string;
  formData: Record<string, any>;
  onChange: (e: TInputChangeEvent) => void;
  disabled?: boolean;
  className?: string;
};

const FlatPickrComp = Flatpickr as any;

const DateInputRange: React.FC<
  TProps & {
    setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  }
> = ({ inpRef, name, formData, setFormData, disabled, className }) => {
  const handelOnChange = (e: Date[]) => {
    if (e?.length === 2) {
      setFormData((prev) => ({
        ...prev,
        dateFrom: dayjs(e[0]).format("YYYY-MM-DD"),
        dateTo: dayjs(e[1]).format("YYYY-MM-DD"),
      }));
    }
  };

  // Custom date formatter for the input display
  const formatDate = (date: Date, format: string) => {
    return dayjs(date).format("DD MMM YYYY");
  };
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

  return (
    <div
      className="grid grid-cols-[150px_auto] [&_.flatpickr-input]:!px-[10px] [&_.flatpickr-wrapper]:pr-[36px] [&_.flatpickr-wrapper]:w-full [&_.flatpickr-wrapper]:h-[35px]  gap-4 items-center"
      ref={ref}
    >
      <label htmlFor="" className="text-sm text-primary font-medium">
        Date
      </label>
      <div className="w-full relative border border-primary-100 rounded-md ">
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
          value={[formData?.dateFrom, formData?.dateTo]}
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
        <div
          className="size-[35px] bg-primary-50 flex justify-center items-center absolute top-0 right-0 !rounded-r-5 !self-end cursor-pointer border-l "
          onClick={() => setShow((prev) => !prev)}
        >
          <div className="flex justify-center items-center">
            <Image
              alt="three-dot"
              src={iconDotLine}
              width={100}
              height={100}
              sizes="100vw"
              className="size-5"
            />
          </div>

          <div
            className={cn(
              "absolute w-36 flex flex-col gap-1 justify-start items-start shadow-md bg-white rounded-10 top-[35px] z-10 p-2",
              !show && "hidden"
            )}
          >
            <button
              className="px-3 py-1 w-full  rounded-t-5 hover:bg-primary-100 text-start"
              onClick={(event) => {
                event.preventDefault();
                setFormData((prev) => ({
                  ...prev,
                  dateFrom: dayjs().format("YYYY-MM-DD"),
                  dateTo: dayjs().add(1, "month").format("YYYY-MM-DD"),
                }));
              }}
            >
              Next Month
            </button>
            <button
              className="px-3 py-1 w-full  hover:bg-primary-100 text-start"
              onClick={(event) => {
                event.preventDefault();
                setFormData((prev) => ({
                  ...prev,
                  dateFrom: dayjs().startOf("month").format("YYYY-MM-DD"),
                  dateTo: dayjs().endOf("month").format("YYYY-MM-DD"),
                }));
              }}
            >
              This Month
            </button>
            <button
              className="px-3 py-1  w-full  hover:bg-primary-100 text-start"
              onClick={(event) => {
                event.preventDefault();
                setFormData((prev) => ({
                  ...prev,
                  dateFrom: dayjs()
                    .subtract(1, "month")
                    .startOf("month")
                    .format("YYYY-MM-DD"),
                  dateTo: dayjs()
                    .subtract(1, "month")
                    .endOf("month")
                    .format("YYYY-MM-DD"),
                }));
              }}
            >
              Last Month
            </button>
            <button
              className="px-3 py-1 w-full  hover:bg-primary-100 text-start"
              onClick={(event) => {
                event.preventDefault();
                setFormData((prev) => ({
                  ...prev,
                  dateFrom: dayjs().startOf("year").format("YYYY-MM-DD"),
                  dateTo: dayjs().endOf("year").format("YYYY-MM-DD"),
                }));
              }}
            >
              This Year
            </button>
            <button
              className="px-3 py-1  w-full  rounded-b-5 hover:bg-primary-100 text-start"
              onClick={(event) => {
                event.preventDefault();
                setFormData((prev) => ({
                  ...prev,
                  dateFrom: dayjs()
                    .subtract(1, "year")
                    .startOf("year")
                    .format("YYYY-MM-DD"),
                  dateTo: dayjs()
                    .subtract(1, "year")
                    .endOf("year")
                    .format("YYYY-MM-DD"),
                }));
              }}
            >
              Last Year
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateInputRange;
