"use client";
import React, { FC, useEffect, useState } from "react";
import { useCPanel } from "./context/CPanelProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { useRouter, useSearchParams } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { FilterBarWrapper } from "@bikiran/utils";
import { InputField, Select } from "@bikiran/inputs";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import SelectedUserInfo from "@/bikiran/shared/user-info/SelectedUserInfo";
import FilterUser from "@/bikiran/shared/user-info/FilterUser";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";

type TFormData = {
  userId?: string;
  subscriptionId: string;
  hostname: string;
  domain: string;
  cPUsername: string;
  emailorphone: string;
  status: string;
};

const CPanelHeaderSection: FC = () => {
  const { reload, loading, data } = useCPanel();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useTemplate();

  const query = {
    subscriptionId: searchParams.get("subscriptionId") || "",
    hostname: searchParams.get("hostname") || "",
    domain: searchParams.get("domain") || "",
    cPUsername: searchParams.get("cPUsername") || "",
    emailorphone: searchParams.get("emailorphone") || "",
    status: searchParams.get("status") || "",
    userId: searchParams.get("userId") || "",
  };

  const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);
  const [formData, setFormData] = useState<TFormData>({
    subscriptionId: query.subscriptionId || "",
    hostname: query.hostname || "",
    domain: query.domain || "",
    cPUsername: query.cPUsername || "",
    emailorphone: query.emailorphone || "",
    status: query.status || "",
    userId: query.userId || "",
  });

  const status = data?.filters?.status;
  const hostname = data?.filters?.hostname;

  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (selectedUser.id) {
      formData["userId"] = selectedUser.id.toString();
    } else {
      delete formData["userId"];
    }
  }, [selectedUser]);

  const handleReset = () => {
    setFormData({
      subscriptionId: "",
      hostname: "",
      domain: "",
      cPUsername: "",
      emailorphone: "",
      status: "",
      userId: "",
    });
    setSelectedUser({} as TUser);
  };

  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };

  const option = [
    {
      id: 1,
      name: "Add cPanel",
      onClick: () => openModal("add-cPanel"),
    },
  ];

  return (
    <TableHeaderWrapperComp
      loading={loading}
      reload={reload}
      title="cPanels List"
      // btnTitle="+ Create cPanels"
      // modalType="create-cPanels"
      option={option}
    >
      <FilterBarWrapper
        formData={formData}
        onSearch={handleSearch}
        resetClick={handleReset}
      >
        {selectedUser.id ? (
          <SelectedUserInfo
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        ) : (
          <FilterUser
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
        <InputField
          formData={formData}
          label={"Subscription Id"}
          placeholder="Ex: 123456"
          name="subscriptionId"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <Select
          formData={formData}
          label={"Hostname"}
          name="hostname"
          onChange={handleInputChange}
          containerClassname="filter-parent-class"
          className=" filter-inputs"
          options={
            hostname?.map((item) =>
              addOption(item, capitalizeFirstLetter(item), item)
            ) || []
          }
          placeholder="Select Hostname"
        />
        <InputField
          formData={formData}
          label={"Domain"}
          placeholder="example.com"
          name="domain"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
        />{" "}
        <InputField
          formData={formData}
          label={"cP Username"}
          placeholder="bik.com"
          name="cPUsername"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Email Or Phone"}
          placeholder="Ex: y@gmail.com or 1234567890"
          name="emailorphone"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <Select
          formData={formData}
          label={"Status"}
          name="status"
          onChange={handleInputChange}
          containerClassname="filter-parent-class"
          className=" filter-inputs"
          options={
            status?.map((item) =>
              addOption(item, capitalizeFirstLetter(item), item)
            ) || []
          }
          placeholder="Select Status"
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default CPanelHeaderSection;
