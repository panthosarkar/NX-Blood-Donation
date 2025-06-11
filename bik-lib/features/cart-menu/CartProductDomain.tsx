import Image from "next/image";
import { cartIcons } from "./icons/cartIcons";
import { CurrencyFormatter } from "./utils/pricing";
import { TCartMenuData } from "./cartMenuTypes";
import { FC } from "react";
import { showCurrencySign } from "@/bik-lib/utils/show";

type TProps = {
  data: TCartMenuData;
  removeProduct: (productId: number) => void;
};

const CartProductDomain: FC<TProps> = ({ data, removeProduct }) => {
  return (
    <div className="border-b last:border-b-0 border-[#E0C1FF] flex items-stretch justify-between gap-[15px] py-[15px] pr-4">
      <div className="flex items-center gap-[15px] overflow-hidden">
        <div className="size-[60px] bg-[rgba(174,0,185,0.05)] rounded-[8px] p-3">
          <Image
            src={cartIcons.domain}
            alt="domain"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-[8px]"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <h2 className="text-primary text-lg font-medium overflow-hidden text-ellipsis">
            {data?.domain.toUpperCase()}
          </h2>
          <p className="text-primary-300 text-xs font-medium mb-2">
            {" "}
            New registration for {data.quantity}{" "}
            {data.quantity > 1 ? "years" : "year"}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          className="size-5"
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            removeProduct(data.id);
          }}
        >
          <Image
            src={cartIcons.remove}
            alt="remove icon"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </button>

        <div>
          <p className="text-[#F50057] font-bold font-lato">
            {showCurrencySign()}
            {CurrencyFormatter(data.totalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProductDomain;
