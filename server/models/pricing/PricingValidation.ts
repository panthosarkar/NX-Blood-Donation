import { DEFAULT_STATUS } from "@/server/utils/constants/DEFAULT_STATUS";
import validation from "@/server/utils/validation/Validation";
import { ValidateAll } from "@/server/utils/validation/ValOperation";

export type TDomainPricing = {
  id?: number;
  tld: string;
  registerFee: number;
  renewFee: number;
  transferFee: number;
  registerDiscountRate: number;
  transferDiscountRate: number;
  registerDiscountDuration: number;
  transferDiscountDuration: number;
  status: "Active" | "Inactive";
  ip: string;
};

export const ValidateDomainPricingPost = (formData: TDomainPricing) => {
  const st = ValidateAll([
    validation.chkString({ tld: formData.tld }, "TLD", 2, 255),
    validation.chkNumber(
      { registerFee: formData.registerFee },
      "Register Fee",
      1,
      255
    ),
    validation.chkNumber({ renewFee: formData.renewFee }, "Renew Fee", 1),
    validation.chkNumber(
      { transferFee: formData.transferFee },
      "Transfer Fee",
      1
    ),
    validation.chkNumber(
      { registerDiscountRate: formData.registerDiscountRate },
      "Register Discount Rate",
      1
    ),
    validation.chkNumber(
      { transferDiscountRate: formData.transferDiscountRate },
      "Transfer Discount Rate",
      1
    ),
    validation.chkNumber(
      { registerDiscountDuration: formData.registerDiscountDuration },
      "Register Discount Duration",
      1
    ),
    validation.chkNumber(
      { transferDiscountDuration: formData.transferDiscountDuration },
      "Transfer Discount Duration",
      1
    ),

    validation.chkSelect({ status: formData.status }, "Status", [
      DEFAULT_STATUS.ACTIVE,
      DEFAULT_STATUS.INACTIVE,
    ]),
  ]);

  return {
    error: st.error,
    message: st.message,
    reference: st.reference,
    skipped: false,
  };
};

export const ValidateDomainPricingPut = (formData: Partial<TDomainPricing>) => {
  const st = ValidateAll([
    validation.chkString({ tld: formData.tld }, "TLD", 2, 255),
    validation.chkNumber(
      { registerFee: formData.registerFee },
      "Register Fee",
      1,
      255
    ),
    validation.chkNumber({ renewFee: formData.renewFee }, "Renew Fee", 1),
    validation.chkNumber(
      { transferFee: formData.transferFee },
      "Transfer Fee",
      1
    ),
    validation.chkNumber(
      { registerDiscountRate: formData.registerDiscountRate },
      "Register Discount Rate",
      1
    ),
    validation.chkNumber(
      { transferDiscountRate: formData.transferDiscountRate },
      "Transfer Discount Rate",
      1
    ),
    validation.chkNumber(
      { registerDiscountDuration: formData.registerDiscountDuration },
      "Register Discount Duration",
      1
    ),
    validation.chkNumber(
      { transferDiscountDuration: formData.transferDiscountDuration },
      "Transfer Discount Duration",
      1
    ),

    validation.chkSelect({ status: formData.status }, "Status", [
      DEFAULT_STATUS.ACTIVE,
      DEFAULT_STATUS.INACTIVE,
    ]),
  ]);

  return {
    error: st.error,
    message: st.message,
    reference: st.reference,
    skipped: false,
  };
};
