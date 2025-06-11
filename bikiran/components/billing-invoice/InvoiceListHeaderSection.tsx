"use client";
import { FC, useState } from "react";
import { useInvoiceList } from "./context/InvoiceListProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import InvoiceFilterFields from "./InvoiceFilterFields";
import dayjs from "dayjs";

const InvoiceListHeaderSection: FC = () => {
  const { reload, loading } = useInvoiceList();

  const [formData, setFormData] = useState<{ [key: string]: any }>({
    dateFrom: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
  });
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
      title=" Invoice Manage"
      btnTitle="+ Create New Invoice"
      modalType="create-invoice"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <InvoiceFilterFields
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default InvoiceListHeaderSection;
