import FilterUser from "@/bikiran/shared/user-info/FilterUser";
import { SelectField } from "@/bik-lib/lib/InputFields";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { addOption } from "@/bik-lib/utils/option";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { Button } from "@bikiran/button";
import { DateInputField, InputField, Select } from "@bikiran/inputs";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { icons } from "@/bikiran/lib/icons";
import SelectedUserInfo from "@/bikiran/shared/user-info/SelectedUserInfo";
import { useInvoiceList } from "./context/InvoiceListProvider";
import DateInputRange from "@/bikiran/shared/inputs/DateInputRange";
// import DataRangeInput from "@/bikiran/shared/inputs/DataRangeInput";

type TProps = {
  formData: { [key: string]: any };
  setFormData: (data: { [key: string]: any }) => void;
  handleInputChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};
const InvoiceFilterFields: FC<TProps> = ({
  formData,
  setFormData,
  handleInputChange,
}) => {
  const { currencies } = useInvoiceList();

  const status = ["Active", "Inactive"];
  const currency = currencies || [];

  const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);

  useEffect(() => {
    if (selectedUser.id) {
      formData["userId"] = selectedUser.id;
    } else {
      delete formData["userId"];
    }
  }, [selectedUser]);
  return (
    <div className="space-y-3">
      {selectedUser.id ? (
        <SelectedUserInfo
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : (
        <FilterUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
      <InputField
        formData={formData}
        label={"Domain"}
        name="domain"
        placeholder="Ex:  .com"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className=" filter-inputs "
      />
      <InputField
        formData={formData}
        label={"Email or Phone"}
        name="emailOrPhone"
        placeholder="Ex: john@example.com or +8801XXXXXXXXX"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className=" filter-inputs"
      />
      {/* <DataRangeInput
        formData={formData}
        setFormData={setFormData}
        onChange={handleInputChange}
      /> */}
      <DateInputRange
        formData={formData}
        name="dateRange"
        onChange={handleInputChange}
        setFormData={setFormData}
      />
      {/* <div className="flex items-center gap-4">
        <div className="grid grid-cols-[150px_auto] items-center gap-4">
          <label htmlFor="" className="text-primary text-base font-medium">
            Date From
          </label>
          <DateInputField
            formData={formData}
            name="dateFrom"
            onChange={handleInputChange}
            className=" filter-inputs"
          />
        </div>
        <div className="grid grid-cols-[150px_auto] items-center gap-4">
          <label htmlFor="" className="text-primary text-base font-medium">
            Date To
          </label>
          <DateInputField
            formData={formData}
            name="dateTo"
            onChange={handleInputChange}
            className=" filter-inputs"
          />
        </div>
      </div> */}
      <Select
        formData={formData}
        label={"Currency"}
        name="currency"
        containerClassname="filter-parent-class"
        className="filter-inputs"
        placeholder="Select Currency"
        options={currency.map((item) =>
          addOption(item.currency, item.currency, item.currency)
        )}
        onChange={handleInputChange}
      />
      <Select
        formData={formData}
        label={"Status"}
        name="status"
        placeholder="Select Status"
        options={status.map((item) =>
          addOption(item, capitalizeFirstLetter(item), item)
        )}
        onChange={handleInputChange}
        containerClassname="filter-parent-class"
        className="filter-inputs"
      />
    </div>
  );
};

export default InvoiceFilterFields;
