"use client";
import iconFilterV2 from "@/public/assets/images/icons/icon-filter.svg";
import Image from "next/image";
import React, { useState } from "react";
import { supportInfoIcons } from "@/bikiran/lib/icons";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import { useAdminSupportData } from "../../context/SupportAdminDataProvider";
import SearchBar from "@/bik-lib/features/search/SearchBar";
import { Button } from "@bikiran/button";

const SupportAdminTableHeaderMobComp = () => {
  const [searchValue, setSearchValue] = useState("");
  const { openModal } = useTemplate();
  const { reloadTicket, ticketData, reFetching } = useAdminSupportData();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-[20px]">
        <div className="text-primary text-center lg:text-2xl font-medium leading-normal p-1.5">
          List of open tickets
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <SearchBar onChange={() => searchValue} value="" className="py-1.5" />
        <div className="flex items-center gap-[10px] flex-shrink-0">
          <button className="flex justify-center items-center bg-primary-100 p-1.5 rounded-10 ">
            <Image
              src={iconFilterV2}
              width={0}
              height={0}
              alt="icon"
              className="size-5"
            />
          </button>
          <ButtonRefresh
            className="size-8"
            onClick={reloadTicket}
            disabled={reFetching || ticketData === undefined}
          />
          <Button
            className="p-1.5 !bg-[#4370FF] flex justify-center items-center rounded-10"
            onClick={() => openModal("open-ticket")}
            disabled={reFetching || ticketData === undefined}
          >
            <Image
              src={supportInfoIcons.iconPlusWhite}
              width={0}
              height={0}
              alt="AddIcon"
              className="size-5"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportAdminTableHeaderMobComp;
