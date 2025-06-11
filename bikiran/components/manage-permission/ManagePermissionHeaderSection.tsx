"use client";
import React, { FC } from "react";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import { useManagePermission } from "./context/ManagePermissionProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";

const filterFields = (statusOptions: any): TFilterField[] => {
  return [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Ex: John Doe",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      placeholder: "Ex: john@gmail.com",
    },
    {
      label: "Mobile",
      name: "mobile",
      type: "text",
      placeholder: "Ex: 01712345678",
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: statusOptions,
    },
  ];
};

const ManagePermissionHeaderSection: FC = () => {
  const { reload, loading } = useManagePermission();

  const status = ["Active", "Inactive"];
  const fields = filterFields(status);
  return (
    <TableHeaderWrapperComp
      loading={loading}
      reload={reload}
      title="Manage Permission"
      btnTitle="+ Add New Role"
      modalType="add-role"
      // fields={fields}
    />
  );
};

export default ManagePermissionHeaderSection;
