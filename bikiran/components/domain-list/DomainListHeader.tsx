import { useRouter } from "next/navigation";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { FC, useState } from "react";
import { useDomainList } from "./context/DomainListProvider";
import { FilterBarWrapper } from "@bikiran/utils";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import Link from "next/link";
import DomainFilterFields from "./DomainFilterFields";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";

const DomainListHeader: FC = () => {
  const { reload, loading } = useDomainList();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const { openModal } = useTemplate();
  const router = useRouter();

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
    <div className="flex gap-2">
      <div className="w-full">
        <TableHeaderWrapperComp
          loading={loading}
          reload={reload}
          title="Domain List"
          // btnTitle="+ Add Subscription"
          // modalType="domain-add"
          option={[
            {
              id: 1,
              name: "+ Add Resellbiz Domain",
              onClick: () => openModal("domain-add", "resell-biz"),
            },
            {
              id: 2,
              name: "+ Add Pre-registered Domain",
              onClick: () => openModal("domain-add", "pre-registered"),
            },
          ]}
        >
          <FilterBarWrapper
            formData={formData}
            onSearch={(search: string) => router.push(search)}
          >
            <DomainFilterFields
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </FilterBarWrapper>
        </TableHeaderWrapperComp>
      </div>
      {/* <InstOption className="size-10 flex">
        <Link href="/domain/deleted-domain" className="p-2">
          Deleted Domain List
        </Link>
      </InstOption> */}
    </div>
  );
};

export default DomainListHeader;
