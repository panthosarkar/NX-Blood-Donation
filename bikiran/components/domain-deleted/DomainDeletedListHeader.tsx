import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import React, { useState } from "react";
import { useDeletedDomain } from "./context/DomainDeletedListProvider";
import { FilterBarWrapper } from "@bikiran/utils";
import { useRouter } from "next/navigation";
import DomainDeletedFilterFields from "./DomainDeletedFilterFields";
import { TInputChangeEvent } from "@/bik-lib/types/event";

const DomainDeletedListHeader = () => {
  const { loading, reload } = useDeletedDomain();
  const router = useRouter();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
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
      title="Deleted Domain List"
      btnTitle=""
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <DomainDeletedFilterFields
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default DomainDeletedListHeader;
