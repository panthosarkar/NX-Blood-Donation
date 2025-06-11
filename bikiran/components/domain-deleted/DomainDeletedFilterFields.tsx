import FilterUser from "@/bikiran/shared/user-info/FilterUser";
import SelectedUserInfo from "@/bikiran/shared/user-info/SelectedUserInfo";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { InputField } from "@bikiran/inputs";
import React, { FC, useEffect, useState } from "react";

type TProps = {
  formData: { [key: string]: any };
  handleInputChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

const DomainDeletedFilterFields: FC<TProps> = ({
  formData,
  handleInputChange,
}) => {
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
        placeholder="y@example.com"
        name="email"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className=" filter-inputs"
      />
      <InputField
        formData={formData}
        label={"Phone"}
        placeholder="ex: +8801xxxxxxxxxxx"
        name="phone"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className=" filter-inputs"
      />
    </div>
  );
};

export default DomainDeletedFilterFields;
