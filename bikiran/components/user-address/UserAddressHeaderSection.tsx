"use client";
import React, { FC, useState } from "react";
import { useUserAddressList } from "./context/UserAddressListProvider";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { FilterBarWrapper } from "@bikiran/utils";
import { InputField, Select } from "@bikiran/inputs";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

const UserAddressHeaderSection: FC = () => {
  const { loading, reload, status } = useUserAddressList();

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const router = useRouter();
  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };
  return (
    <TableHeaderWrapperComp
      loading={loading}
      title="User Address List"
      reload={reload}
      btnTitle="+ Create Address"
      modalType="add-address"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <InputField
          formData={formData}
          label={"Name"}
          name="name"
          placeholder="Ex: John Doe"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Organization"}
          name="organization"
          placeholder="Ex: Bikiran"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Email"}
          name="email"
          placeholder="Ex: john@gmail.com"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Phone"}
          name="phone"
          placeholder="Ex: +8801XXXXXXXXX"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className="filter-inputs"
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
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default UserAddressHeaderSection;
