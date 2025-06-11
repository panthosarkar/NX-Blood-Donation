"use client";
import React, { useEffect, useState } from "react";
import { useTransaction } from "./context/TransactionProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import { Select } from "@bikiran/inputs";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import DateInputRange from "@/bikiran/shared/inputs/DateInputRange";

const TransactionHeaderSection: React.FC = () => {
  const { reFetching, refetchTransactionData, filterOption } = useTransaction();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const status = filterOption?.trStatus || [];
  const type = filterOption?.trType || [];

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
      loading={reFetching}
      reload={refetchTransactionData}
      title="Transaction manage"
      // btnTitle="+ Create New Invoice"
      // modalType="create-invoice"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <DateInputRange
          formData={formData}
          name="date"
          onChange={handleInputChange}
          className="filter-inputs"
          setFormData={setFormData}
        />
        <Select
          formData={formData}
          label={"Type"}
          name="type"
          containerClassname="filter-parent-class"
          options={type.map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
          onChange={handleInputChange}
          placeholder="Select Status"
          className="filter-inputs"
        />
        <Select
          formData={formData}
          label={"Status"}
          name="status"
          containerClassname="filter-parent-class"
          options={status.map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
          onChange={handleInputChange}
          placeholder="Select Status"
          className="filter-inputs"
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default TransactionHeaderSection;
