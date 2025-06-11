"use client";
import { FC, useState } from "react";
import { useAppsServerList } from "./context/AppsServerListProvider";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import { useRouter } from "next/navigation";
import FilterFieldsComp from "@/bik-lib/filterbar-package/FilterFieldsComp";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { InputField } from "@bikiran/inputs";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

const AppsServerListHeader: FC = () => {
  const { reload, loading, appsServerListData } = useAppsServerList();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const router = useRouter();
  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };

  return (
    <TableHeaderWrapperComp
      // btnTitle="+ Create Apps Database"
      modalType="create-apps-server"
      loading={loading}
      reload={reload}
      title="Apps Server List"
    >
      {/* <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <InputField
          formData={formData}
          label={"Name"}
          name="name"
          placeholder="Ex: John Doe"
          onChange={handleInputChange}
        />{" "}
        <InputField
          formData={formData}
          label={"Email"}
          name="email"
          placeholder="Ex: john@gmail.com"
          onChange={handleInputChange}
        />
        <Select
          formData={formData}
          label={"Status"}
          name="status"
          options={appsListData?.status?.map((item: any) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
          onChange={handleInputChange}
          placeholder="Select Status"
        />
      </FilterBarWrapper> */}
    </TableHeaderWrapperComp>
  );
};

export default AppsServerListHeader;
