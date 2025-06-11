import { Dialog, DialogTrigger } from "@/bikiran/components/ui/dialog";
import { icons } from "@/bikiran/lib/icons";
import Image from "next/image";
import React from "react";
import ModalFilter from "./Modal/ModalFilter";

const ButtonFilter = () => {
  return (
    <div className="flex items-center gap-2.5 bg-primary-50 rounded-10 px-2.5 py-2">
      <div className="w-6">
        <Image
          src={icons.iconFilter}
          alt="filter"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
      <p className="text-primary-500 text-base font-normal">Filter</p>
    </div>
  );
};
const FilterBtn = () => {
  return (
    <div className="h-[40px]">
      <Dialog>
        <DialogTrigger>
          <ButtonFilter />
        </DialogTrigger>
        <ModalFilter />
      </Dialog>
    </div>
  );
};

export default FilterBtn;
