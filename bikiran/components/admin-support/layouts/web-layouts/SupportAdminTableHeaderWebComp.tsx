"use client";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import React, { useState } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useAdminSupportData } from "../../context/SupportAdminDataProvider";
import SearchBar from "@/bik-lib/features/search/SearchBar";
import { Button } from "@bikiran/button";

const SupportAdminTableHeaderWebComp = () => {
  const [searchValue, setSearchValue] = useState("");
  const { openModal } = useTemplate();
  const { reloadTicket, reFetching } = useAdminSupportData();

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-[20px]">
        <div className="text-primary text-center text-2xl font-medium leading-normal">
          List of open tickets
        </div>
        <Button
          title={"Open New Ticket"}
          variant="blue"
          className="px-[15px] py-[8px]"
          onClick={() => openModal("open-ticket")}
          disabled={reFetching}
        />
      </div>
      <div className="flex items-center gap-[10px]">
        <SearchBar onChange={() => {}} value={searchValue} />
        {/* to do : add filter modal */}
        <ButtonRefresh
          className="size-10"
          onClick={reloadTicket}
          disabled={reFetching}
        />
      </div>
    </div>
  );
};

export default SupportAdminTableHeaderWebComp;
