import Image from "next/image";
import { CurrencyFormatter, ShowCurrencySign } from "./utils/pricing";
import { FC } from "react";
import { productRenewIcons } from "./icons/productRenewIcons";
import { TRenewData } from "./renewProductTypes";

type TProps = {
  data: TRenewData;
};

const RenewProductDomain: FC<TProps> = ({ data }) => {
  return (
    <div className="border-b border-[#E0C1FF] flex items-stretch justify-between gap-[15px] py-[15px] pr-4">
      <div className="flex items-center gap-[15px] overflow-hidden">
        <div className="size-[60px] bg-[rgba(174,0,185,0.05)] rounded-[8px] p-3">
          <Image
            src={productRenewIcons.domain}
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
          }}
        >
          <Image
            src={productRenewIcons.remove}
            alt="remove icon"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </button>

        <div>
          <p className="text-[#F50057] font-bold font-lato">
            {ShowCurrencySign()}
            {CurrencyFormatter(data.price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RenewProductDomain;
