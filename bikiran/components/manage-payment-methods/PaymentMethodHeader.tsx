import { FC, useState } from "react";
import { usePaymentMethod } from "./context/PaymentMethodProvider";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import PaymentFilterFields from "./PaymentFilterFields";
import { FilterBarWrapper } from "@bikiran/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";

const PaymentMethodHeader: FC = () => {
  const { loading, reload } = usePaymentMethod();
  const searchParams = useSearchParams();

  const query = {
    currency: searchParams.get("currency") || "",
  };

  const [formData, setFormData] = useState<{ [key: string]: any }>({
    currency: query.currency || "",
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
      title="Payment Methods"
      btnTitle="+ Add Payment Method"
      modalType="add-payment-method"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <PaymentFilterFields
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default PaymentMethodHeader;
