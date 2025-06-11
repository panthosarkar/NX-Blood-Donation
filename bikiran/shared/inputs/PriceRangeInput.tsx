import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import React, { FC } from "react";

type TProps = {
  priceFrom: string;
  priceTo: string;
  formData: { [key: string]: any };
  onChange: (ev: TInputChangeEvent) => void;
  onBlur?: (ev: TInputChangeEvent) => void;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
};

const PriceRangeInput: FC<TProps> = ({
  priceFrom,
  priceTo,
  formData,
  onChange,
  autoComplete = "off",
  placeholder = "",
  disabled,
  onBlur,
}) => {
  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (!/^\d*$/.test(value)) {
      return;
    }
    onChange(ev);
  };

  return (
    <div className="grid grid-cols-[150px_auto] gap-4 items-center">
      <label
        htmlFor=""
        className="text-primary text-base font-medium flex items-center gap-2"
      >
        <span>Price</span>
        <TooltipWrapper content="Price range">
          <svg
            width="20"
            height="20"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3555 13.3564C11.411 13.1341 11.4556 12.9364 11.5125 12.742C11.5252 12.6992 11.5744 12.6512 11.6177 12.636C12.4099 12.3542 13.188 12.0228 14.0608 12.0755C14.8042 12.12 15.4869 12.5647 15.6037 13.2279C15.6761 13.642 15.6499 14.0998 15.5548 14.5118C15.3397 15.4432 15.0465 16.3567 14.8017 17.2816C14.7325 17.5439 14.7015 17.8201 14.6871 18.0916C14.6663 18.4828 14.8352 18.6835 15.2239 18.757C15.6287 18.8334 16.024 18.7816 16.4094 18.6395C16.4353 18.6298 16.4637 18.6271 16.5269 18.6131C16.4721 18.8262 16.4285 19.0163 16.3717 19.2021C16.3593 19.2429 16.3059 19.2848 16.2626 19.2997C15.7832 19.4656 15.3108 19.6702 14.8182 19.7787C14.1173 19.9331 13.4138 19.9306 12.782 19.4948C12.322 19.1775 12.1243 18.7383 12.154 18.1858C12.2075 17.1926 12.6046 16.2832 12.8401 15.3341C12.9568 14.864 13.076 14.3888 13.1252 13.9085C13.18 13.3755 12.8991 13.1277 12.3509 13.1468C12.185 13.1528 12.0186 13.1795 11.8557 13.2134C11.6962 13.2474 11.5409 13.3025 11.3555 13.3564Z"
              fill="#130F40"
            />
            <path
              d="M14.6065 8.15365C15.4191 8.15153 16.0275 8.76932 16.0131 9.56149C16.0025 10.1415 15.6036 10.6443 15.0168 10.8179C14.371 11.0084 13.6493 10.6906 13.3697 10.0927C12.9751 9.24836 13.5288 8.26524 14.4572 8.16299C14.5127 8.15746 14.5692 8.1562 14.6065 8.15365Z"
              fill="#130F40"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 2.00012C7.38318 2.00012 2 7.3833 2 14.0001C2 20.6174 7.38319 26.0001 14 26.0001C20.6173 26.0001 26 20.6174 26 14.0001C26 7.38331 20.6173 2.00012 14 2.00012ZM6.78473 6.78482C8.71207 4.85707 11.2738 3.79622 14 3.79622C16.7261 3.79622 19.2875 4.85746 21.2152 6.78485C23.1431 8.71218 24.2038 11.2744 24.2038 14.0001C24.2038 16.7258 23.1427 19.2876 21.2152 21.2153C19.2879 23.1432 16.7257 24.2039 14 24.2039C11.2743 24.2039 8.7125 23.1428 6.7847 21.2153C4.85695 19.288 3.7961 16.7263 3.7961 14.0001C3.7961 11.274 4.85736 8.71218 6.78473 6.78482Z"
              fill="#130F40"
            />
          </svg>
        </TooltipWrapper>
      </label>
      <div className="grid grid-cols-[auto_50px_auto] items-center border border-primary-200 rounded-5 px-[10px]">
        <input
          type="text"
          name={priceFrom}
          value={formData[priceFrom] || ""}
          onChange={handleInputChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full h-[30px] outline-none  disabled:grayscale px-[10px] text-center"
        />
        <div className="h-full flex bg-primary-100 justify-center items-center">
          <span className="text-primary text-base font-medium">to</span>
        </div>
        <input
          type="text"
          name={priceTo}
          value={formData[priceTo] || ""}
          onChange={handleInputChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full h-[30px] outline-none  disabled:grayscale px-[10px] text-center"
        />
      </div>
    </div>
  );
};

export default PriceRangeInput;
