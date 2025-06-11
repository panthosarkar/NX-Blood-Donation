import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TFilterField } from "./filterBarTypes";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { TUser } from "@/src/shared/user-search/UserSearchType";
import { Fields } from "./Fields";
import { Button } from "@src/button";

type TProps = {
  fields: TFilterField[];
  filters: Record<string, any>;
  handleInputChange: (ev: TInputChangeEvent) => void;
  handleSearch: () => void;
  closeFilter: () => void;
};
const FilterFieldsComp: FC<TProps> = ({
  fields,
  filters,
  handleInputChange,
  closeFilter,
}) => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);
  const handleSearch = () => {
    // Build the query string
    const queryString = Object.entries(filters)
      .filter(([_, value]) => value) // Filter out empty values
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    router.push(`?${queryString}`);
  };
  const handleOnSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    handleSearch();
    closeFilter();
  };

  useEffect(() => {
    if (selectedUser?.id) {
      const event = {
        target: {
          name: "user",
          value: selectedUser.displayName,
        },
      } as unknown as TInputChangeEvent;
      handleInputChange(event);
    } else {
      const event = {
        target: {
          name: "user",
          value: "",
        },
      } as unknown as TInputChangeEvent;
      handleInputChange(event);
    }
  }, [selectedUser]);

  return (
    <form
      onSubmit={handleOnSubmit}
      className="pt-8 px-4 pb-4 space-y-[10px] border border-secondary-100 border-t-transparent rounded-bl-10 rounded-br-10"
    >
      <div className="grid grid-cols-2 gap-[10px] -mb-[10px]">
        {fields
          .filter((el) => el.divide)
          ?.map((field) => {
            return (
              <Fields
                divide={true}
                field={field}
                key={field.name}
                filters={filters}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                handleInputChange={handleInputChange}
              />
            );
          })}
      </div>
      {fields
        .filter((el) => !el.divide)
        ?.map((field) => {
          return (
            <Fields
              divide={true}
              field={field}
              key={field.name}
              filters={filters}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              handleInputChange={handleInputChange}
            />
          );
        })}
      <div className="flex justify-end">
        <Button type="submit" variant="secondary" className="w-36 py-2">
          Search
        </Button>
      </div>
    </form>
  );
};

export default FilterFieldsComp;
