"use client";
import React, { useState } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useGatewayTransaction } from "./context/GatewayTransactionProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import { InputField, Select } from "@bikiran/inputs";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

const GatewayTransactionHeaderSection: React.FC = () => {
  const { openModal } = useTemplate();
  const { refetchGatewayTransactionData, reFetching, gatewayTransaction } =
    useGatewayTransaction();

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const status = ["pending", "completed", "failed", "cancelled"];
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
      reload={refetchGatewayTransactionData}
      title="Gateway-Transaction manage"

      // btnTitle="+ Create Gateway-Transaction"
      // modalType="create-domain-package"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <InputField
          formData={formData}
          label={"Invoice ID"}
          name="invoiceId"
          placeholder="Ex: 123456"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Type"}
          name="type"
          placeholder="Ex: Invoice"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <Select
          formData={formData}
          label={"Status"}
          name="status"
          containerClassname="filter-parent-class"
          className="filter-inputs"
          options={status.map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
          onChange={handleInputChange}
          placeholder="Select Status"
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default GatewayTransactionHeaderSection;
