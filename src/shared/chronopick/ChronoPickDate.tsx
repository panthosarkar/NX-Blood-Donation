import {
  ChronoPick,
  ChronoPickMode,
  SelectedDateType,
} from "@bikiran/chronopick";
import React, { FC, useState, useEffect } from "react";

import { TState } from "@/library/global-types";
import { formatDate } from "@/library/utils/dateUtils";
import { cn } from "@/library/utils/cn";

/* 
Usage:
Default value format if any : 
{
  date: "2023-10-01",
  from: "2023-10-01",
  to: "2023-10-31",
  dates: ["2023-10-01", "2023-10-15", "2023-10-20"]
  }

<ChronoPickDate
  label="Select Date"
  formData={formData}
  setFormData={setFormData}
  mode={ChronoPickMode.Single}
/>
*/

const ChronoPickDate: FC<{
  label?: string;
  formData: Record<string, any>;
  setFormData: TState<Record<string, any>>;
  mode?: ChronoPickMode;
  classname?: string;
  inputClassName?: string;
}> = ({
  label,
  formData,
  classname,
  inputClassName,
  setFormData,
  mode = ChronoPickMode.Single,
}) => {
  const [date, setDate] = useState<SelectedDateType>(null);

  const fdt = {
    from: formData.from || formData.dateFrom,
    to: formData.to || formData.dateTo,
  };

  // Sync formData to ChronoPick initial value
  useEffect(() => {
    if (mode === ChronoPickMode.Multiple && Array.isArray(formData.dates)) {
      setDate(formData.dates.map((d: string) => new Date(d)));
    } else if (mode === ChronoPickMode.Range && fdt.from && fdt.to) {
      setDate({
        from: new Date(fdt.from),
        to: new Date(fdt.to),
      });
    } else if (mode === ChronoPickMode.Single && formData.date) {
      setDate(new Date(formData.date));
    }
  }, [formData, mode]);

  const handleDateChange = (selected: SelectedDateType) => {
    setDate(selected);

    let formatted: Record<string, any> = {};

    if (selected instanceof Date) {
      formatted = { date: formatDate(selected, "YYYY-MM-DD") };
    } else if (Array.isArray(selected)) {
      formatted = { dates: selected.map((d) => formatDate(d, "YYYY-MM-DD")) };
    } else if (
      selected &&
      typeof selected === "object" &&
      "from" in selected &&
      "to" in selected
    ) {
      formatted = {
        dateFrom: selected.from
          ? formatDate(selected.from, "YYYY-MM-DD")
          : null,
        dateTo: selected.to ? formatDate(selected.to, "YYYY-MM-DD") : null,
      };
    }

    setFormData({ ...formData, ...formatted });
  };

  return (
    <div className={cn("!w-full", classname)}>
      {label && (
        <label className="text-sm font-medium text-primary label">
          {label}
        </label>
      )}
      <ChronoPick
        value={date}
        onChange={handleDateChange}
        mode={mode}
        className={inputClassName}
      />
    </div>
  );
};

export default ChronoPickDate;
