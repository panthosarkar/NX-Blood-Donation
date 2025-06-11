import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import { FilterBarWrapper } from "@bikiran/utils";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useAccountAdmContext } from "./context/AccountAdmProvider";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import AccountFilterFields from "./AccountFilterFields";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";

const AccountAdmHeaderSection: FC<{ isHash: boolean }> = ({ isHash }) => {
  const { openModal } = useTemplate();
  const { reFetch, reFetching } = useAccountAdmContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = {
    status: searchParams.get("status") || "",
    type: searchParams.get("type") || "",
  };

  // const [hash, setHash] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    dateFrom: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    status: isHash ? query.status : "",
    type: isHash ? query.type : "",
  });

  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (search: string) => {
    router.push(`${search}${isHash ? "#add-credit-debit-note" : ""}`);
  };

  const options = [
    {
      id: 1,
      name: "Add Credit Note",
      onClick: () => openModal("add-credit-note"),
    },
    {
      id: 2,
      name: "Add Debit Note",
      onClick: () => openModal("add-debit-note"),
    },
  ];

  return (
    <TableHeaderWrapperComp
      loading={reFetching}
      title="Billing Account"
      reload={reFetch}
      // btnTitle="+ Add"
      // modalType="add"
      option={options}
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <AccountFilterFields
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default AccountAdmHeaderSection;
