import FilterUser from "@/bikiran/shared/user-info/FilterUser";
import { InputDateRange } from "@/bik-lib/lib/InputFields";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { addOption } from "@/bik-lib/utils/option";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { DateInputField, InputField, Select } from "@bikiran/inputs";
import React, { FC, useEffect, useState } from "react";
import SelectedUserInfo from "@/bikiran/shared/user-info/SelectedUserInfo";
import { useAccountAdmContext } from "./context/AccountAdmProvider";
// import DataRangeInput from "@/bikiran/shared/inputs/DataRangeInput";
import DateInputRange from "@/bikiran/shared/inputs/DateInputRange";
type TProps = {
  formData: { [key: string]: any };
  setFormData: (data: { [key: string]: any }) => void;
  handleInputChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};
const AccountFilterFields: FC<TProps> = ({
  formData,
  setFormData,
  handleInputChange,
}) => {
  const { filters } = useAccountAdmContext();
  const status = filters.status || [];
  const currency = filters.currency || [];
  const types = filters.types || [];
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
        label={"Email or Phone"}
        name="emailOrPhone"
        placeholder="Ex: john@example.com  or +8801XXXXXXXXX"
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
      <InputField
        formData={formData}
        label={"Project Name"}
        name="projectName"
        placeholder="Ex: John Doe Project"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className=" filter-inputs"
      />
      <Select
        formData={formData}
        label={"Currency"}
        name="currency"
        placeholder="Select Currency"
        containerClassname="filter-parent-class"
        className="filter-inputs"
        options={currency.map((item) =>
          addOption(item.currency, item.title, item.currency)
        )}
        onChange={handleInputChange}
      />
      <Select
        formData={formData}
        label={"Account Type"}
        name="type"
        placeholder="Select Account Type"
        containerClassname="filter-parent-class"
        className="filter-inputs"
        options={types.map((item) =>
          addOption(item.key, item.title, item.title)
        )}
        onChange={handleInputChange}
      />
      <Select
        formData={formData}
        label={"Status"}
        name="status"
        placeholder="Select Status"
        containerClassname="filter-parent-class"
        className="filter-inputs"
        options={status.map((item) =>
          addOption(item, capitalizeFirstLetter(item), item)
        )}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default AccountFilterFields;
