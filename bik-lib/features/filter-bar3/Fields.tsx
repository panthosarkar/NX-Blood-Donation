import { FC } from "react";
import { TFilterField } from "./filterBarTypes";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { cn } from "@/bik-lib/utils/cn";
import { InputField, Select } from "@bikiran/inputs";
import FilterUser3 from "./FilterUser3";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { InputDate } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import DatePicker from "react-datepicker";

export const Fields: FC<{
  field: TFilterField;
  filters: Record<string, any>;
  handleInputChange: (ev: TInputChangeEvent) => void;
  selectedUser: TUser;
  setSelectedUser: (user: TUser) => void;
  divide?: boolean;
}> = ({
  field,
  filters,
  handleInputChange,
  selectedUser,
  setSelectedUser,
  divide,
}) => {
  return (
    <div
      key={field.name}
      className={cn("flex items-center w-full [&>*:last-child]:w-full", {
        "flex-col items-start": divide,
      })}
    >
      <div className="w-60 text-base font-medium text-primary">
        {field.label}
      </div>
      {field.type === "text" && (
        <InputField
          label=""
          name={field.name}
          placeholder={field.placeholder}
          formData={filters}
          onChange={handleInputChange}
          className="w-full h-[35px] "
        />
      )}
      {field.type === "user" && (
        <div>
          <div>
            <FilterUser3
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div>
        </div>
      )}
      {field.type === "select" && (
        <Select
          label=""
          name={field.name}
          options={
            field.options?.map((items) =>
              addOption(items, capitalizeFirstLetter(items), items)
            ) || []
          }
          formData={filters}
          placeholder="Any"
          onChange={(ev: any) => {
            handleInputChange(ev);
          }}
          className="w-full !h-[35px] border border-gray-300 rounded-lg p-2"
        />
      )}
      {field.type === "dateRange" && (
        <InputDate
          formData={filters}
          name={field.name}
          onChange={handleInputChange}
          className="[&_.react-datepicker-wrapper]:w-full !h-[35px]"
        />
      )}
    </div>
  );
};
