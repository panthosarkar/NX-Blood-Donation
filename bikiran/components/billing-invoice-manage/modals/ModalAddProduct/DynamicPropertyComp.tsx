import React, { FC } from "react";
import { HostingProperty } from "./HostingProperty";
import DomainProperty from "./DomainProperty";
import EmailProperty from "./EmailProperty";
import { ServerDedicatedProperty } from "./ServerDedicatedProperty";
import { ServerVpsProperty } from "./ServerVpsProperty";
import PushProperty from "./PushProperty";
import SmsProperty from "./SmsProperty";
import { PremiumContractProperty } from "./PremiumContractProperty";
import { TInputChangeEvent } from "@/bik-lib/types/event";

type TProps = {
  product: string;
  modalData?: any;
  formData: Record<string, any>;
  handleOnChange: (e: TInputChangeEvent) => void;
};

const DynamicPropertyComp: FC<TProps> = ({
  product,
  modalData,
  formData,
  handleOnChange,
}) => {
  return (
    <div>
      {(() => {
        const key = product === modalData?.type ? modalData?.type : product;

        switch (key) {
          case "hosting":
            return (
              <HostingProperty
                formData={formData}
                handleOnChange={handleOnChange}
              />
            );
          case "email":
            return (
              <EmailProperty
                formData={formData}
                handleOnChange={handleOnChange}
              />
            );
          case "dedicated-server":
            return (
              <ServerDedicatedProperty
                formData={formData}
                handleOnChange={handleOnChange}
              />
            );
          case "server-vps":
            return (
              <ServerVpsProperty
                formData={formData}
                handleOnChange={handleOnChange}
              />
            );
          case "push":
            return (
              <PushProperty
                formData={formData}
                handleOnChange={handleOnChange}
              />
            );
          case "sms":
            return (
              <SmsProperty
                formData={formData}
                handleOnChange={handleOnChange}
              />
            );
          case "custom":
            return <div>{/* TODO : Add ckEditors */}</div>;
          case "premium":
            return (
              <PremiumContractProperty
                formData={formData}
                handleOnChange={handleOnChange}
              />
            );
          default:
            return (
              <DomainProperty
                formData={formData}
                handleOnChange={handleOnChange}
              />
            );
        }
      })()}
    </div>
  );
};

export default DynamicPropertyComp;
