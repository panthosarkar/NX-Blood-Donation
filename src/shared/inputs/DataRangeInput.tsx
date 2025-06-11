import Image from "next/image";
import React, { FC, useState } from "react";
import iconDotLine from "./icon-vertical-dot-fill.svg";
import { TInputChangeEvent, TState } from "@/bik-lib/types/event";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { cn } from "@/bik-lib/utils/cn";
import { DateInputField } from "@src/inputs";

type TProps = {
  formData: { [key: string]: any };
  setFormData: TState<{ [key: string]: any }>;
  onChange: (ev: TInputChangeEvent) => void;
  className?: string;
};

const DataRangeInput: FC<TProps> = ({ formData, setFormData, onChange }) => {
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
    <div ref={ref} className="grid grid-cols-[150px_auto] gap-4 items-center">
      <label htmlFor="" className="text-sm text-primary font-medium">
        Date
      </label>
      <div className="flex items-center h-[35px] border border-primary-100 rounded-md ">
        <DateInputField
          formData={formData}
          name="dateFrom"
          onChange={onChange}
          className="[&_input]:border-none [&_input]:text-center h-full "
        />
        <div className="h-full w-[50px] flex bg-primary-100 justify-center items-center">
          <span className="text-primary text-base font-medium">to</span>
        </div>
        <DateInputField
          formData={formData}
          name="dateTo"
          onChange={onChange}
          className="[&_input]:border-none [&_input]:text-center h-full"
        />
        <div className="h-full w-11 bg-primary-100 flex justify-center items-center relative !rounded-r-5 !self-end">
          <div
            className="flex justify-center items-center"
            onClick={() => setShow((prev) => !prev)}
          >
            <Image
              alt=""
              src={iconDotLine}
              width={100}
              height={100}
              sizes="100vw"
              className="size-[20px]"
            />
          </div>

          <div
            className={cn(
              "absolute w-36 flex flex-col gap-1 justify-center items-start shadow-md bg-white rounded-10 top-[35px] z-10 p-2",
              !show && "hidden"
            )}
          >
            <button
              className="px-3 py-1 w-full bg-primary-50 rounded-t-5"
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
              className="px-3 py-1 w-full bg-primary-100"
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
              className="px-3 py-1  w-full bg-primary-50"
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
              className="px-3 py-1 w-full bg-primary-100"
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
              className="px-3 py-1  w-full bg-primary-50 rounded-b-5"
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

export default DataRangeInput;
