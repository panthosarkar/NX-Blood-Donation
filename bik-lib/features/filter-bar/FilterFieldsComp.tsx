import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addOption } from "@/bik-lib/utils/option";
import { TFilterField } from "./filterBarTypes";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { TUser } from "@/src/shared/user-search/UserSearchType";
import Image from "next/image";
import { InputField, Select } from "@src/inputs";
import { Button } from "@src/button";
import FilterUser from "@/src/shared/user-info/FilterUser";

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
      className="pt-8 px-4 pb-4 space-y-4.5 border border-secondary-100 border-t-transparent rounded-bl-10 rounded-br-10"
    >
      {fields.map((field) => (
        <div
          key={field.name}
          className="flex items-center w-full [&>*:last-child]:w-full"
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
              className="w-full"
            />
          )}
          {field.type === "user" && (
            <div>
              {!selectedUser.id ? (
                <div>
                  <FilterUser
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                  />
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={selectedUser.photoUrl}
                      alt="user"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="size-7 rounded-full"
                    />
                    <span>{selectedUser.displayName}</span>
                  </div>
                  <div>
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedUser({} as TUser)}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              )}
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
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          )}
          {field.type === "dateRange" && (
            <div className="flex space-x-2">
              <input
                type="date"
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(ev: TInputChangeEvent) => handleInputChange(ev)}
              />
              <input
                type="date"
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(ev: TInputChangeEvent) => handleInputChange(ev)}
              />
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-end">
        <Button type="submit" variant="secondary" className="w-36 py-2">
          Search
        </Button>
      </div>
    </form>
  );
};

export default FilterFieldsComp;
