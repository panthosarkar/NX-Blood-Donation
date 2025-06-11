import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { FC } from "react";

const PriceCalculationComp: FC<{
  subTotal: number;
  selectedData: number;
  currency: string;
}> = ({ subTotal, selectedData, currency }) => {
  return (
    <div className="flex items-center justify-end gap-7 text-primary text-base font-medium mt-4 mb-5">
      <span>Subtotal ({selectedData} Items )</span>{" "}
      <span>
        {showCurrencySign(currency)} {showInt(subTotal)}
      </span>
    </div>
  );
};

export default PriceCalculationComp;
