import { InputDate } from "@/bik-lib/lib/InputFields";
import React from "react";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { TAddDomainPayload } from "../domainListTypes";
import { DateInputField } from "@bikiran/inputs";

const SetDateModalComp = ({
  formData,
  handleOnChange,
  modalData,
}: {
  formData: TAddDomainPayload;
  handleOnChange: (ev: TInputChangeEvent) => void;
  modalData: any;
}) => {
  return (
    <div
      className={
        modalData === "pre-registered"
          ? "grid grid-cols-1 gap-2"
          : "grid grid-cols-2 gap-2"
      }
    >
      <div className="flex flex-col gap-1">
        <label className="text-base text-primary font-medium">
          Subscription Start
        </label>
        <DateInputField
          formData={formData}
          name="subscriptionStart"
          onChange={handleOnChange}
          className="w-full [&>div]:w-full z-50"
        />
      </div>
      {modalData && modalData !== "pre-registered" ? (
        <div className="flex flex-col gap-1">
          <label className="text-base text-primary font-medium">
            Subscription End
          </label>
          <DateInputField
            formData={formData}
            name="subscriptionEnd"
            onChange={handleOnChange}
            className="w-full [&>div]:w-full z-50"
          />
        </div>
      ) : null}
    </div>
  );
};

export default SetDateModalComp;
