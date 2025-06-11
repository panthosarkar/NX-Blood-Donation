"use client";
import { useHosting } from "./context/HostingPricingProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "@bikiran/utils";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import RangeInputField from "../domain-pricing/RangeInput";
import { Select } from "@bikiran/inputs";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import { Button } from "@bikiran/button";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import Link from "next/link";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";

const DownloadButton: FC = () => {
  return (
    <Link
      target="_blank"
      href="/hosting/pricing/download"
      className="size-10 p-2 border rounded-10 bg-primary text-white"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.84016 14.936C7.33616 14.431 7.26716 13.752 7.66616 13.247C7.88916 12.967 8.20016 12.801 8.54316 12.781C8.56716 12.78 8.59116 12.779 8.61516 12.779C8.94616 12.779 9.26416 12.915 9.51716 13.166C10.1822 13.825 10.8442 14.488 11.5052 15.152L12.7912 16.446V13.84C12.7912 10.372 12.7912 6.90499 12.7922 3.43699C12.7922 3.24199 12.7952 3.06599 12.8372 2.90499C12.9842 2.32499 13.5292 1.94199 14.1272 2.00599C14.7182 2.06399 15.1772 2.54099 15.2182 3.14099C15.2252 3.24399 15.2252 3.34799 15.2252 3.45199L15.2262 16.422L15.5592 16.103C15.6032 16.061 15.6392 16.027 15.6742 15.991L16.4502 15.215C17.1392 14.524 17.8282 13.834 18.5182 13.147C18.8582 12.809 19.2632 12.701 19.7222 12.828C20.1812 12.954 20.4692 13.256 20.5762 13.727C20.6802 14.173 20.5552 14.563 20.1982 14.921C19.4192 15.696 18.6442 16.473 17.8672 17.25L16.6452 18.474C16.0892 19.031 15.5342 19.587 14.9772 20.142C14.3532 20.766 13.6652 20.765 13.0412 20.141V20.14C11.3072 18.407 9.57416 16.673 7.84016 14.936ZM25.9972 19.941C25.9962 19.767 25.9942 19.593 25.9952 19.418C25.9972 19.071 25.8682 18.749 25.6312 18.512C25.4052 18.287 25.1042 18.164 24.7832 18.164C24.7802 18.164 24.7762 18.164 24.7732 18.164C24.1002 18.169 23.5662 18.715 23.5572 19.408C23.5532 19.658 23.5542 19.908 23.5552 20.159C23.5552 20.327 23.5562 20.495 23.5552 20.662C23.5472 22.332 22.3422 23.547 20.6902 23.549C16.2342 23.555 11.7802 23.555 7.32616 23.549C5.67816 23.546 4.47416 22.34 4.46316 20.683C4.46216 20.513 4.46316 20.345 4.46416 20.175C4.46516 19.904 4.46716 19.631 4.46016 19.36C4.44216 18.705 3.94816 18.201 3.28616 18.165C2.98616 18.152 2.68516 18.251 2.44816 18.447C2.20416 18.648 2.06116 18.921 2.04416 19.215C1.99516 20.078 1.94516 20.972 2.14216 21.844C2.70116 24.32 4.78016 25.988 7.31716 25.994C8.86016 25.997 10.4062 25.995 11.9512 25.996L14.0112 25.993C14.7232 25.993 15.4362 25.995 16.1472 25.996C17.7032 26 19.3122 26.003 20.8932 25.989C23.2092 25.966 25.3462 24.224 25.8632 21.936C26.0102 21.279 26.0042 20.599 25.9972 19.941Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
};

const HostingPricingHeaderSection: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const router = useRouter();

  const { openModal } = useTemplate();

  const { reload, loading, hostingPriceData } = useHosting();
  const typeOptions = hostingPriceData.subTypes;
  const status = hostingPriceData.status;

  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };
  return (
    <div className="flex flex-wrap justify-between items-center gap-2.5 mb-4">
      <div className="flex items-center gap-x-8 gap-y-2 flex-1">
        <h2 className="text-2xl  font-medium whitespace-nowrap">
          Hosting Package
        </h2>
        <div className="w-full max-w-[700px]">
          <FilterBarWrapper formData={formData} onSearch={handleSearch}>
            <RangeInputField
              formData={formData}
              label="Disk"
              content="Disk Range"
              fromField="diskFrom"
              toField="diskTo"
              onChange={handleInputChange}
              classname="filter-inputs "
            />
            <RangeInputField
              label="CPU"
              content="CPU Range"
              formData={formData}
              fromField="cpuFrom"
              toField="cpuTo"
              onChange={handleInputChange}
              classname="filter-inputs"
            />
            <RangeInputField
              formData={formData}
              label="RAM"
              content="RAM Range"
              fromField="ramFrom"
              toField="ramTo"
              onChange={handleInputChange}
              classname="filter-inputs"
            />
            <Select
              formData={formData}
              label={"Type"}
              name="type"
              onChange={handleInputChange}
              options={typeOptions.map((item) => addOption(item, item, item))}
              placeholder="Select Type"
              containerClassname="filter-parent-class"
              className="filter-inputs"
            />{" "}
            <Select
              formData={formData}
              label={"Select Hostname"}
              name="hostname"
              onChange={handleInputChange}
              options={hostingPriceData?.cpServers?.map(
                (item) => addOption(item, item, item) || []
              )}
              placeholder="Select Hostname"
              containerClassname="filter-parent-class"
              className="filter-inputs"
            />
            <Select
              formData={formData}
              label={"Select Location"}
              name="location"
              onChange={handleInputChange}
              options={hostingPriceData?.locations?.map(
                (item) => addOption(item, item, item) || []
              )}
              placeholder="Select Location"
              containerClassname="filter-parent-class"
              className="filter-inputs"
            />
            <Select
              formData={formData}
              label={"Select Vendor"}
              name="vendor"
              onChange={handleInputChange}
              options={hostingPriceData?.vendors?.map(
                (item) => addOption(item, item, item) || []
              )}
              placeholder="Select Vendor"
              containerClassname="filter-parent-class"
              className="filter-inputs"
            />
            <Select
              formData={formData}
              label={"Status"}
              name="status"
              onChange={handleInputChange}
              containerClassname="filter-parent-class"
              options={status.map((item) =>
                addOption(item, capitalizeFirstLetter(item), item)
              )}
              placeholder="Select Status"
              className="filter-inputs"
            />
          </FilterBarWrapper>
        </div>
      </div>
      <div className="flex items-stretch gap-2">
        <div className="h-10">
          <ButtonRefresh disabled={loading} onClick={reload} />
        </div>
        {/* <DownloadButton /> */}

        <Button
          variant="secondary"
          className="px-4 h-10 text-sm"
          disabled={loading}
          onClick={() => openModal("create-hosting-package")}
        >
          + Create New Package
        </Button>
        <InstOption className="size-10">
          {hostingPriceData?.currencies?.map((i) => (
            <Link
              key={i}
              target="_blank"
              href={`/hosting/pricing/download?currency=${i}`}
              className="p-2"
            >
              Download package in {i}
            </Link>
          ))}
        </InstOption>
      </div>
    </div>
  );
};

export default HostingPricingHeaderSection;
