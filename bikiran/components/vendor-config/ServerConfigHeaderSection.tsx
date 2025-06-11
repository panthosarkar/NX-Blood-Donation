"use client";
import { FC, useState } from "react";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { useUnlocatedHosting } from "./context/ServerConfigProvider";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";

const ServerConfigHeaderSection: FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const { reload, loading } = useUnlocatedHosting();
  const router = useRouter();

  const handleInputChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };

  return (
    <TableHeaderWrapperComp
      loading={loading}
      reload={reload}
      title="Vendor Configuration List"
      // btnTitle="+ Assign"
      // modalType="assign-hosting"
    >
      {/* <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <Select
          formData={formData}
          label={"Hostname"}
          name="hostname"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className="filter-inputs"
          options={
            filters?.hostname?.map((item) => addOption(item, item, item)) || []
          }
        />
      </FilterBarWrapper> */}
    </TableHeaderWrapperComp>
  );
};

export default ServerConfigHeaderSection;
