/* eslint-disable no-unused-vars */
"use client";
import { FC } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useManageApp } from "../context/ManageApplicationProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import SearchBar from "@/bik-lib/features/search/SearchBar";
import { Button } from "@bikiran/button";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { a } from "framer-motion/dist/types.d-6pKw1mTI";

const ApplicationHeader: FC<{
  text: string;
  onChange: (ev: TInputChangeEvent) => void;
}> = ({ text, onChange }) => {
  const { reFetch, reFetching, appList } = useManageApp();
  const { openModal } = useTemplate();

  return (
    <TableHeaderWrapperComp
      loading={reFetching || appList === undefined}
      title="Applications"
      reload={reFetch}
      btnTitle="+ Add New Application"
      modalType="add-application"
    >
      <SearchBar
        onChange={onChange}
        value={text}
        name="text"
        className="!h-10 !w-76"
      />
    </TableHeaderWrapperComp>
  );
};

export default ApplicationHeader;
