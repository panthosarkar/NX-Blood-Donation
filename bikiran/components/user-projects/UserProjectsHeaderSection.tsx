"use client";
import React, { FC, useEffect, useState } from "react";
import { useUserProjectsList } from "./context/UserProjectsListProvider";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import { InputField, Select } from "@bikiran/inputs";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import SelectedUserInfo from "@/bikiran/shared/user-info/SelectedUserInfo";
import FilterUser from "@/bikiran/shared/user-info/FilterUser";

const UserProjectsHeaderSection: FC = () => {
  const { loading, reload } = useUserProjectsList();
  const status = ["active", "inactive"];

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
      title="User Project List"
      reload={reload}
      loading={loading}
      // modalType="add-Projects"
      // btnTitle="+ Add Project"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
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
          label={"Project Name"}
          name="projectName"
          placeholder="Ex: John Doe"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Email"}
          name="contactEmail"
          placeholder="Ex: john@gmail.com"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
        />{" "}
        <InputField
          formData={formData}
          label={"Phone"}
          name="contactPhone"
          placeholder="Ex: john@gmail.com"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
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
          className=" filter-inputs"
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default UserProjectsHeaderSection;
