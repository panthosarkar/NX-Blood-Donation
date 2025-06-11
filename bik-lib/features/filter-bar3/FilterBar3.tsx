import { cn } from "@/bik-lib/utils/cn";
import { TFilterField } from "./filterBarTypes";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import iconFilter from "./icons/icon-filter.svg";
import FilterFieldsComp from "./FilterFieldsComp";

type TProps = {
  fields: TFilterField[];
  onSearch: (filters: Record<string, any>) => void;
  placeholder?: string;
  disabled?: boolean;
};

const getStrValue = (filter: Record<string, any>) => {
  // //check if value is not string type then convert it to string
  if (Object.values(filter).some((val) => typeof val !== "string")) {
    const newFilter = { ...filter };
    Object.keys(newFilter).forEach((key) => {
      if (typeof newFilter[key] !== "string") {
        newFilter[key] = JSON.stringify(newFilter[key]);
      }
    });
    return JSON?.stringify(newFilter)?.replace(/[{},"]/g, " ");
  }

  //if any property is empty then remove that property
  if (Object.values(filter).some((val) => val?.trim() === "")) {
    const newFilter = { ...filter };
    Object.keys(newFilter).forEach((key) => {
      if (newFilter[key]?.trim() === "") {
        delete newFilter[key];
      }
    });
    return JSON?.stringify(newFilter)?.replace(/[{},"]/g, " ");
  }

  return JSON?.stringify(filter)?.replace(/[{},"]/g, " ");
};

const FilterBar3: FC<TProps> = ({
  fields,
  onSearch,
  disabled,
  placeholder = "Search anything...",
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // get queries
  const urlParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  // get properties of fields object from urlParams
  const properties =
    Object.fromEntries(
      fields.map((field) => [field.name, urlParams.get(field.name) || ""])
    ) || {};

  const propertiesWithDefaultValue = fields.reduce(
    (acc: Record<string, any>, field) => {
      if (field.defaultValue) {
        acc[field.name] = field.defaultValue;
      }
      return acc;
    },
    properties
  );

  const [filters, setFilters] = useState(properties);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const filterValues = Object.keys(filters).length > 0 ? filters : properties;
  const searchedValue: string = getStrValue(filterValues) || "";
  console.log(
    Object.values(filters).some((i) => console.log(i, "okk")),
    "filter"
  );
  useEffect(() => {
    const urlParams = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    const properties =
      Object.fromEntries(
        fields.map((field) => [field.name, urlParams.get(field.name) || ""])
      ) || {};
    setFilters(properties);
  }, [window.location.search]);

  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name) {
      setFilters((prev: Record<string, any>) => ({ ...prev, [name]: value }));
    }
  };
  const handleSearch = () => {
    onSearch(filters);
  };

  // outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isSelectClick =
        (e.target as Element)?.closest('[role="combobox"]') ||
        (e.target as Element)?.closest('[role="listbox"]');

      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !isSelectClick
      ) {
        setIsFilterOpen(false);
        setIsFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const isOpen = isFilterOpen || isFocus;

  const closeFilterBar = () => {
    setIsFilterOpen(false);
    setIsFocus(false);
  };

  return (
    <div
      className={cn(
        "bg-white shadow-[0_7px_20px_rgb(174_0_185/5%)] rounded-10 relative z-[1]",
        {
          "[&_input]:bg-primary-50 [&>div]:!border-primary-100 bg-primary-50  pointer-events-none ":
            disabled,
        }
      )}
      ref={ref}
    >
      {/* Search Bar */}
      <div
        className={cn(
          "flex items-center h-10 overflow-hidden border border-secondary-100 rounded-10 relative z-50",
          {
            "rounded-bl-none rounded-br-none": isOpen,
          }
        )}
      >
        <input
          type="text"
          onChange={() => {}}
          onFocus={() => setIsFocus(true)} // toggle filter bar
          value={searchedValue}
          readOnly
          placeholder="Search Anything...."
          className="flex-1 rounded-10 py-2 px-4 focus:outline-none text-xs"
          // onBlur={() => setIsFocus(false)}
        />
        {/* if searchedValue is empty then show placeholder */}
        {searchedValue?.length === 2 && (
          <span
            className="absolute top-1/2 left-4 -translate-y-1/2 text-primary-500"
            onClick={() => setIsFilterOpen((prev) => !prev)} // toggle filter bar
          >
            {placeholder}
          </span>
        )}
        <button
          className={cn(
            "w-10 h-[80%] mx-1 px-3 rounded-[5px] hover:bg-primary-100 transition-colors",
            {
              "bg-primary-100": isOpen,
            }
          )}
          onClick={() => setIsFilterOpen((prev) => !prev)} // toggle filter bar
        >
          <Image
            src={iconFilter}
            alt="filter"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </button>
      </div>

      {/* Filter Section */}
      <div
        className={cn(
          "w-full bg-white shadow-[0_7px_20px_rgb(174_0_185/5%)] absolute top-8 left-0 z-30 max-h-0 overflow-hidden transition-[max-height]",
          {
            "max-h-[500px]": isOpen,
          }
        )}
      >
        <FilterFieldsComp
          fields={fields}
          filters={filters}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          closeFilter={closeFilterBar}
        />
      </div>
    </div>
  );
};

export default FilterBar3;
