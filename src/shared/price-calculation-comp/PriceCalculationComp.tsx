import React, { FC, useState } from "react";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import dayjs from "dayjs";
import { showInt } from "@/bik-lib/utils/show";
import { CalculationInputField } from "@src/inputs";
import { cn } from "@/bik-lib/features/dropdown/CustomDropdown";
import { Checkbox } from "@/src/components/ui/checkbox";

type TProps = {
  formData: any;
  handleOnChange: (ev: TInputChangeEvent) => void;
  currency?: string;
  unit?: string;
};

const PriceCalculationComp: FC<TProps> = ({
  formData,
  handleOnChange,
  unit,
  currency,
}) => {
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const calculateTotalPrice = () => {
    const price = Number(formData.contractPrice) || 0; // Default to 0 if price is not provided
    const offer =
      Number(formData.contractPriceOffer) > 0 &&
      Number(formData.contractPriceOffer) <= price
        ? Number(formData.contractPriceOffer)
        : price;
    const vat = formData?.contractVatPercent || 0; // Default to 0 if VAT is not provided

    const total = vat > 0 ? offer + offer * (vat / 100) : offer;

    return showInt(total); // Assuming showInt formats the number
  };

  const calculateMoneySaved = () => {
    const price = formData?.contractPrice || 0;
    const offer = formData?.contractPriceOffer || 0;

    const savedAmount = price - offer;

    return showInt(savedAmount);
  };

  return (
    <div className="pb-3.5 space-y-2.5">
      <div className="grid grid-cols-2 gap-2 items-start">
        <CalculationInputField
          calculate
          formData={formData}
          label={"Price"}
          name="contractPrice"
          onChange={handleOnChange}
          unit={unit || "_"}
          currency={currency || "_"}
          required
        />
        <div>
          <CalculationInputField
            calculate
            formData={formData}
            label={"Offer Price"}
            name="contractPriceOffer"
            onChange={handleOnChange}
            unit={unit || "_"}
            currency={currency || "_"}
            required
          />
          <span className={`text-secondary text-xs px-1 `}>
            Saved: {calculateMoneySaved()} {formData?.contractCurrency}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 h-[45px] gap-2 items-start">
        <label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox
            checked={checkbox}
            onCheckedChange={(checked) => setCheckbox(!!checked)}
            className="border-primary-500 ring-0 data-[state=checked]:border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-white disabled:bg-primary-200 disabled:border-primary-500"
          />
          <span className="text-xs text-primary-500 group-hover:text-secondary">
            Add VAT To this product
          </span>
        </label>
        {checkbox && (
          <div>
            <CalculationInputField
              calculate
              formData={formData}
              label={"VAT"}
              name="contractVatPercent"
              onChange={handleOnChange}
              unit={"%"}
            />
            <span className={`text-secondary text-xs px-1`}>
              Total Price: {calculateTotalPrice()}{" "}
              {formData?.contractCurrency}{" "}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceCalculationComp;
