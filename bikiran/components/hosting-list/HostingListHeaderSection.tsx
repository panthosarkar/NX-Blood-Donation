"use client";
import React, { FC, useState } from "react";
import { useHostingList } from "./context/HostingListProvider";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import HostingFilterFields from "./HostingFilterFields";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";

const HostingListHeaderSection: FC = () => {
  const { reload, loading } = useHostingList();
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
      loading={loading}
      reload={reload}
      title="User Hosting List"
      btnTitle="+ Add Subscription"
      modalType="create-hosting"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <HostingFilterFields
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default HostingListHeaderSection;
