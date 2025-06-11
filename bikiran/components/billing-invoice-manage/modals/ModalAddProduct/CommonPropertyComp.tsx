import { TInputChangeEvent } from "@/bik-lib/types/event";
import {
  AnimatedInputField,
  DateInputField,
  DurationInput,
} from "@bikiran/inputs";
import React, { FC } from "react";
import PriceCalculationComp from "@/bikiran/shared/price-calculation-comp/PriceCalculationComp";
import { useInvoiceInfo } from "../../context/InvoiceManageProvider";

type TProps = {
  formData: Record<string, any>;
  handleOnChange: (e: TInputChangeEvent) => void;
  modalData?: any;
};

const CommonPropertyComp: FC<TProps> = ({
  formData,
  handleOnChange,
  modalData,
}) => {
  const { invoiceInfo } = useInvoiceInfo();
  const { invoice } = invoiceInfo;

  return (
    <div className="space-y-3">
      <AnimatedInputField
        label="Title"
        name="title"
        formData={formData}
        onChange={handleOnChange}
      />
      <div className="grid grid-cols-2 gap-2 items-center">
        <DateInputField
          formData={formData}
          name="subscriptionStart"
          onChange={handleOnChange}
          className="h-full !w-full [&_.react-datepicker-popper]:z-50"
        />
        <DurationInput
          durationName="contractDuration"
          unitName="contractUnitName"
          formData={formData}
          onChange={handleOnChange}
          className="h-full !w-full [&_.react-datepicker-popper]:z-50"
          disabled={invoice?.status === "paid"}
          options={(modalData?.assetKey === "HOSTING"
            ? ["YEAR", "MONTH"]
            : ["YEAR"]
          ).map((option, index) => ({
            id: index,
            title: option,
            label: option,
            value: option,
          }))}
        />
      </div>
      <PriceCalculationComp
        formData={formData}
        handleOnChange={handleOnChange}
        currency={
          formData?.contractCurrency !== undefined
            ? formData.contractCurrency
            : invoice?.localCurrency || "_"
        }
        unit={`${formData?.contractDuration || "_"} ${formData?.contractUnitName || "_"}`}
      />
    </div>
  );
};

export default CommonPropertyComp;
