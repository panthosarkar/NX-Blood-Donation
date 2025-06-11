"use client";
import React, { FC, useState } from "react";
import { useUserPhonesList } from "./context/UserPhonesListProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import { InputField, Select } from "@bikiran/inputs";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";

const UserPhonesHeaderSection: FC = () => {
  const { userPhonesData, loading, reload } = useUserPhonesList();
  const status = userPhonesData?.status;
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
      title="User Phone List"
      reload={reload}
      btnTitle="+ Add Phone"
      modalType="add-phone"
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
          label={"Type"}
          name="type"
          options={[]}
          onChange={handleInputChange}
          placeholder="Select Status"
          containerClassname="filter-parent-class"
          className="filter-inputs"
        />
        <Select
          formData={formData}
          label={"Status"}
          name="status"
          options={status.map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
          onChange={handleInputChange}
          placeholder="Select Status"
          containerClassname="filter-parent-class"
          className="filter-inputs"
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default UserPhonesHeaderSection;
