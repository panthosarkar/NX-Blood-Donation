import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { addOption } from "@/bik-lib/utils/option";
import { InputField, Select } from "@bikiran/inputs";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { useDomainList } from "./context/DomainListProvider";
import { FC, useEffect, useState } from "react";
import FilterUser from "@/bikiran/shared/user-info/FilterUser";
import SelectedUserInfo from "@/bikiran/shared/user-info/SelectedUserInfo";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

type TProps = {
  formData: { [key: string]: any };
  handleInputChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

const DomainFilterFields: FC<TProps> = ({ formData, handleInputChange }) => {
  const { status } = useDomainList();
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
        label={"Domain Name"}
        placeholder="example.com"
        name="domain"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className=" filter-inputs"
      />
      <InputField
        formData={formData}
        label={"Email"}
        placeholder="example@example.com"
        name="email"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className=" filter-inputs"
      />
      <InputField
        formData={formData}
        label={"Phone"}
        placeholder="8801XXXXXXXXX"
        name="phone"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className=" filter-inputs"
      />
      <Select
        formData={formData}
        label={"Status"}
        placeholder="Select Status"
        name="status"
        onChange={handleInputChange}
        options={status.map((item) =>
          addOption(item, capitalizeFirstLetter(item), item)
        )}
        containerClassname="filter-parent-class"
        className=" filter-inputs"
      />
    </div>
  );
};

export default DomainFilterFields;
