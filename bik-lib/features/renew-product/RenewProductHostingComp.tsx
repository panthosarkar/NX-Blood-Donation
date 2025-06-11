
import { FC } from "react";
import { TRenewData } from "./renewProductTypes";
import { Checkbox } from "@/bikiran/components/ui/checkbox";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

type TProps = {
  data: TRenewData;
  setSelectedData?: () => void;
  selectedData?: TRenewData[];
  isSelected?: boolean;
};

const RenewProductHostingComp: FC<TProps> = ({
  data,
  setSelectedData,
  selectedData = [],
  isSelected,
}) => {
  const isChecked =
    isSelected ||
    selectedData?.some(
      (dt: TRenewData) => dt?.subscriptionId === data?.subscriptionId
    );
  return (
    <>
      <div
        className={` border-[#E0C1FF] flex items-stretch justify-between gap-[15px] pl-3 pr-5 py-5 cursor-pointer ${isSelected ? "border rounded-[13px]" : ""
          }`}
        onClick={setSelectedData}
      >
        <div className="flex items-center gap-[15px] overflow-hidden">
          <Checkbox
            id={`${data?.subscriptionId}`}
            className={`size-7 bg-secondary border border-primary-500 ${isChecked ? "bg-secondary" : "bg-white"
              }`}
            onChange={setSelectedData}
            checked={isChecked}
          />
          <div className="flex-1 overflow-hidden">
            <h2 className="text-primary text-lg font-medium overflow-hidden text-ellipsis">
              {data?.title}
            </h2>
            {isSelected ? (
              <p className="text-primary-500 text-xs font-medium mb-2">
                {" "}
                Hosting Renew for {data?.quantity}{" "}
                {data?.quantity > 1 ? "months" : "month"}
              </p>
            ) : (
              <p className="text-error text-xs font-normal mb-2">
                {data?.subTitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div>
            <p className="text-[#F50057] text-lg font-bold font-lato">
              {showCurrencySign(data?.currency)}
              {showInt(data?.price)}
            </p>
            <p className="text-[#F50057] text-xs font-medium">
              /{capitalizeFirstLetter(data?.unitName.toLowerCase())}
            </p>
          </div>
        </div>
      </div>
      <div className={`border-b border-[#E0C1FF] last:border-b-0 mx-2.5 ${isSelected ? "border-b-0" : ""}`}></div>
    </>
  );
};

export default RenewProductHostingComp;
