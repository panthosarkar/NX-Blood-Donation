import { FC, useState } from "react";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { TAddDomainPayload } from "../domainListTypes";
import { AnimatedInputField, ValidationInputField } from "@bikiran/inputs";

type TProps = {
  formData: any;
  handleOnChange: (ev: TInputChangeEvent) => void;
  domainLoading: boolean | undefined;
  errorMassage: string;
};

const DomainSelectSectionModalComp: FC<TProps> = ({
  formData,
  handleOnChange,
  domainLoading,
  errorMassage,
}) => {
  const [show, setShow] = useState<boolean>(true);

  const valid = errorMassage === "" ? true : false;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <ValidationInputField
          label="Domain"
          name="domainName"
          className=""
          formData={formData}
          onChange={handleOnChange}
          autoComplete="off"
          loading={domainLoading}
          disabled={
            !formData.contractCurrency && !formData.contractCurrencyRate
          }
          valid={valid}
          onBlur={() => setShow(true)}
        />

        {show && errorMassage !== "" && (
          <div className={`text-error text-xs px-2 `}>{errorMassage}</div>
        )}
      </div>
      <AnimatedInputField
        label="Title"
        name="title"
        className=""
        formData={formData}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default DomainSelectSectionModalComp;
