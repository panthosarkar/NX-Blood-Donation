import React, { FC, useEffect } from "react";
import { useDomainList } from "../context/DomainListProvider";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedInputField, AnimatedSelect } from "@bikiran/inputs";

type TProps = {
  formData: any;
  setFormData: any;
  handleOnChange: any;
};

const SetCurrencyModalComp: FC<TProps> = ({
  formData,
  setFormData,
  handleOnChange,
}) => {
  const { currencies } = useDomainList();

  useEffect(() => {
    if (formData.contractCurrency === "BDT") {
      setFormData({
        ...formData,
        contractCurrencyRate:
          currencies
            ?.find((item) => item.currency === "BDT")
            ?.rate.toString() || "",
      });
    } else if (formData.contractCurrency === "USD") {
      setFormData({
        ...formData,
        contractCurrencyRate: "1",
      });
    }
  }, [formData.contractCurrency]);

  return (
    <div className="grid grid-cols-2 items-center gap-2">
      {/* <Select
        label=""
        name="contractCurrency"
        placeholder="Select Currency"
        className="w-56"
        options={
          currencies?.map(({ currency }) =>
            addOption(currency, currency, currency)
          ) || []
        }
        formData={formData}
        onChange={handleOnChange}
      /> */}
      <AnimatedSelect
        className="h-[45px] mt-1"
        name="contractCurrency"
        label=""
        onChange={handleOnChange}
        placeholder="Select Currency"
        options={
          currencies?.map(({ currency }) =>
            addOption(currency, currency, currency)
          ) || []
        }
        formData={formData}
      />
      <AnimatedInputField
        label="Currency Rate"
        name="contractCurrencyRate"
        className="w-56 mt-1"
        formData={formData}
        onChange={handleOnChange}
        disabled={formData.contractCurrency === "USD"}
      />
    </div>
  );
};

export default SetCurrencyModalComp;
