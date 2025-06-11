import { FC } from "react";
import { cn } from "@/bik-lib/utils/cn";
import { Checkbox } from "@/bikiran/components/ui/checkbox";
import { assetKeys } from "@/bik-lib/lib/assets";
import { getDomainUrl } from "@/bik-lib/utils/Env";
import { TRenewProduct } from "./renewProductTypes";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import Link from "next/link";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

type TProps = {
  data: TRenewProduct;
  setSelectedData?: () => void;
  selectedData?: TRenewProduct[];
  isSelected?: boolean;
};

const getManageUrl = (type: string, data: TRenewProduct) => {
  switch (type) {
    case assetKeys.domain:
      return `${getDomainUrl()}/domain/${data?.domain}/overview`;
    case assetKeys.hosting:
      return `${getDomainUrl()}/hosting/${data?.packageId}/overview`;
    default:
      return `/`;
  }
};

const RenewProductComp: FC<TProps> = ({
  data,
  setSelectedData,
  selectedData = [],
  isSelected,
}) => {
  const isChecked =
    isSelected ||
    selectedData?.some(
      (dt: TRenewProduct) => dt?.subscriptionId === data?.subscriptionId
    );

  const domain = data?.domain || "";

  return (
    <>
      <div
        className={` border-[#E0C1FF] flex flex-wrap sm:flex-nowrap items-stretch justify-between gap-[15px] sm:pl-3 sm:pr-5 py-5 cursor-pointer ${
          isSelected ? "sm:border border-y sm:rounded-[13px]" : ""
        }`}
        onClick={setSelectedData}
      >
        <div
          className={cn("flex gap-[15px] overflow-hidden", {
            "items-center": true,
            "items-start": domain,
          })}
        >
          <Checkbox
            id={`${data?.subscriptionId}`}
            className={cn(
              " border border-primary-500 size-7 ring-0 data-[state=checked]:border-secondary  data-[state=checked]:bg-secondary data-[state=checked]:text-white",
              {
                "bg-white": true,
                "bg-secondary": isChecked,
                "mt-1.5": domain,
              }
            )}
            onChange={setSelectedData}
            checked={isChecked}
          />
          <div className="flex-1 overflow-hidden">
            <h2 className="text-primary text-lg font-medium overflow-hidden text-ellipsis">
              {data?.title}
            </h2>
            <p className="text-primary-700 text-xs mb-1">
              Subscription ID:{" "}
              <span className="text-primary">#{data?.subscriptionId}</span>
            </p>
            {domain && (
              <p className="text-primary text-sm font-normal mb-2">{domain}</p>
            )}
            <div className="flex items-center gap-2 mb-2">
              <p className="text-error text-xs font-normal">{data?.subTitle}</p>
              <Link
                href={getManageUrl(data?.assetKey, data)}
                target="_blank"
                className={cn(
                  "underline text-secondary-700 text-xs hover:text-secondary",
                  {
                    hidden:
                      data?.assetKey !== assetKeys.domain &&
                      data?.assetKey !== assetKeys.hosting,
                  }
                )}
              >
                Manage
              </Link>
            </div>
            {/* {isSelected ? (
              <p className="text-primary-500 text-xs font-medium mb-2">
                {" "}
                {data?.assetKey?.toLowerCase()} Renew for {data?.quantity}{" "}
                {data?.subTitle}
              </p>
            ) : (
              <p className="text-error text-xs font-normal mb-2">
                {data?.subTitle}
              </p>
            )} */}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center -mb-1">
            <p className="text-[#F50057] text-[20px] font-bold font-lato">
              {showCurrencySign(data?.currency)} {showInt(data?.priceOffer)}
            </p>
            <p className="text-[#F50057] text-xs text-right font-medium">
              /{data?.quantity}{" "}
              {capitalizeFirstLetter(data?.unitName.toLowerCase())}
            </p>
          </div>
          <div className="flex items-center line-through">
            <p className="text-primary-500 text-xs font-bold font-lato">
              {showCurrencySign(data?.currency)} {showInt(data?.price)}
            </p>
            <p className="text-primary-500 text-xs text-right font-medium">
              /{data?.quantity}{" "}
              {capitalizeFirstLetter(data?.unitName.toLowerCase())}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`border-b border-[#E0C1FF] last:border-b-0 mx-2.5 ${
          isSelected ? "border-b-0" : ""
        }`}
      ></div>
    </>
  );
};

export default RenewProductComp;
