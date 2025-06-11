import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import React, { useEffect, useState } from "react";
import { usePremiumInfo } from "./context/PremiumInfoProvider";
import { FilterBarWrapper } from "@bikiran/utils";
import { useRouter } from "next/navigation";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import SelectedUserInfo from "@/bikiran/shared/user-info/SelectedUserInfo";
import FilterUser from "@/bikiran/shared/user-info/FilterUser";
import { InputField, Select } from "@bikiran/inputs";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

const PremiumSubsHeader = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);

  const { loading, reload, data } = usePremiumInfo();
  const router = useRouter();

  const status = data?.filters?.status;

  useEffect(() => {
    if (selectedUser.id) {
      formData["userId"] = selectedUser.id;
    } else {
      delete formData["userId"];
    }
  }, [selectedUser]);

  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };

  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <TableHeaderWrapperComp
      loading={loading}
      reload={reload}
      title="Premium Subscriptions"
      btnTitle="+ Add Premium Subscription"
      modalType="add-premium"
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
          label={"Subscription ID"}
          name="subscriptionId"
          placeholder="ex: 1234"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Identity"}
          name="identity"
          placeholder="ex: 1234"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Email Or Phone"}
          name="emailOrPhone"
          placeholder="ex: example@gmail.com or 8801XXXXXXXXX"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <Select
          formData={formData}
          label="Status"
          name="status"
          onChange={handleInputChange}
          placeholder="Select Status"
          containerClassname="filter-parent-class"
          className="filter-inputs"
          options={
            status?.map((item: string) =>
              addOption(item, capitalizeFirstLetter(item), item)
            ) || []
          }
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default PremiumSubsHeader;
