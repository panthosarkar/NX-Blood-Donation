"use client";
import { FC, useState } from "react";
import { useUserList } from "./context/UserListProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { InputField } from "@bikiran/inputs";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import Select from "../domain-list/select-field/Select";

type UserListFilterProps = {
  formData: { [key: string]: any };
  handleInputChange: (ev: TInputChangeEvent) => void;
  handleSearch: (search: string) => void;
  userListData: any;
};

const UserListFilterComp: FC<UserListFilterProps> = ({
  formData,
  handleInputChange,
  handleSearch,
  userListData,
}) => {
  return (
    <FilterBarWrapper formData={formData} onSearch={handleSearch}>
      <InputField
        formData={formData}
        label={"Name"}
        name="name"
        placeholder="ex: John Doe"
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
        label={"Mobile"}
        name="mobile"
        placeholder="8801XXXXXXXXX"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className="filter-inputs"
      />
      <InputField
        formData={formData}
        label={"Company"}
        name="company"
        placeholder="ex: Google"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className="filter-inputs"
      />
      <Select
        formData={formData}
        label={"Status"}
        name="status"
        options={userListData?.status?.map((item: any) =>
          addOption(item, capitalizeFirstLetter(item), item)
        )}
        onChange={handleInputChange}
        placeholder="Select Status"
        containerClassname="filter-parent-class"
        className="filter-inputs"
      />
    </FilterBarWrapper>
  );
};
const UserListHeader: FC = () => {
  const { reload, loading, userListData } = useUserList();
  const { openModal } = useTemplate();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const router = useRouter();
  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name === "mobile") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: numericValue });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };

  return (
    <div className=" flex gap-2">
      <div className=" w-full">
        <TableHeaderWrapperComp
          btnTitle="+ Create User"
          modalType="create-user"
          loading={loading}
          reload={reload}
          title="User List"
        >
          <UserListFilterComp
            formData={formData}
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
            userListData={userListData}
          />
        </TableHeaderWrapperComp>
      </div>
      <InstOption className="size-10">
        {/* <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("update-user", data);
                  }}
                >
                  Update
                </button> */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openModal("from-resellbiz");
          }}
        >
          Import from Resellbiz
        </button>
      </InstOption>
    </div>
  );
};

export default UserListHeader;
