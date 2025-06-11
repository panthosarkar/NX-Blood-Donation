import React, { FC, useState } from "react";
import { useDomain } from "./context/DomainPricingProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import { Select } from "@bikiran/inputs";
import { useRouter, useSearchParams } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import PriceRangeInput from "./RangeInput";
import TldInputField from "./TldInputField";
import RangeInputField from "./RangeInput";

const DomainPricingHeaderSection: FC = () => {
  const { data, reFetch, loading } = useDomain();
  const status = data?.status;
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = {
    domain: searchParams.get("domain") || "",
    price: searchParams.get("price") || "",
    status: searchParams.get("status") || "",
  };

  const [formData, setFormData] = useState<{ [key: string]: any }>({
    domain: query.domain || "",
    price: query.price || "",
    status: query.status || "active",
  });

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
      reload={reFetch}
      title="Domain Package"
      // btnTitle="+ Create New Package"
      // modalType="create-domain-package"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        {/* <InputField
          formData={formData}
          label={"TLD"}
          placeholder="example.com"
          name="domain"
          onChange={handleInputChange}
           parentClassName="filter-parent-class"
        /> */}
        <TldInputField setFormData={setFormData} />
        <RangeInputField
          formData={formData}
          label="Price"
          fromField="priceFrom"
          toField="priceTo"
          content="Disk Range"
          onChange={handleInputChange}
          classname="filter-inputs !h-[35px]"
        />
        <Select
          formData={formData}
          label={"Status"}
          name="status"
          onChange={handleInputChange}
          containerClassname="filter-parent-class [&>.wrapper]:mt-0"
          options={status.map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
          placeholder="Select Status"
          className="filter-inputs !h-[35px] !py-0"
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default DomainPricingHeaderSection;
