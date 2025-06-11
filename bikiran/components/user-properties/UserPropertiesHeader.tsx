"use client";
import React, { FC, useEffect, useState } from "react";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import { InputField, Select } from "@bikiran/inputs";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { useUserProp } from "./context/UserPropertiesProvider";

const UserPropertiesHeader: FC = () => {
  const { reload, loading, status } = useUserProp();

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);

  const router = useRouter();
  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name === "contactPhone" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };

  useEffect(() => {
    if (selectedUser.id) {
      formData["user"] = selectedUser.id;
    } else {
      delete formData["user"];
    }
  }, [selectedUser]);

  return (
    <TableHeaderWrapperComp
      title="User Properties"
      reload={reload}
      loading={loading}
      // modalType="add-Projects"
      // btnTitle="+ Add Project"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        {/* {selectedUser.id ? (
          <SelectedUserInfo
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        ) : (
          <FilterUser
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )} */}
        <InputField
          formData={formData}
          label={"Name"}
          name="name"
          placeholder="Ex: John Doe"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Company Name"}
          name="company"
          placeholder="Ex: Bikiran"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Email"}
          name="email"
          placeholder="Ex: john@gmail.com"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
        />{" "}
        <InputField
          formData={formData}
          label={"Mobile"}
          name="mobile"
          placeholder="Ex: 01XXXXXXXXXX"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <Select
          formData={formData}
          label={"Status"}
          name="status"
          placeholder="Select Status"
          options={
            status?.map((st) => addOption(st, capitalizeFirstLetter(st), st)) ||
            []
          }
          onChange={handleInputChange}
          containerClassname="filter-parent-class"
          className=" filter-inputs"
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default UserPropertiesHeader;
