import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogDescription,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Button } from "@bikiran/button";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { CopyWrapper, InformationTooltip } from "@bikiran/utils";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { InputField, Select } from "@bikiran/inputs";
import { cn } from "@/bik-lib/utils/cn";
import { usePremiumInfo } from "../context/PremiumInfoProvider";
import { addOption } from "@/bik-lib/utils/option";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();
  const { data, reload } = usePremiumInfo();
  const { post } = useApi();

  const [formData, setFormData] = useState<{
    contractCurrency: string;
    contractCurrencyRate: string;
  }>({
    contractCurrency: modalData?.contractCurrency || "",
    contractCurrencyRate: modalData?.contractCurrencyRate || "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const currency = data?.filters?.currencies;

  useEffect(() => {
    if (formData.contractCurrency === "USD") {
      setFormData((prev) => ({
        ...prev,
        contractCurrencyRate: "1",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        contractCurrencyRate:
          data?.filters?.currencies
            ?.find((item) => item.currency === formData.contractCurrency)
            ?.rate?.toString() || "",
      }));
    }
  }, [formData.contractCurrency]);

  const handleOnChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateCurrency = () => {
    setLoading(true);
    post(`/admin/premium-contract/${modalData?.id}/update-currency`, formData)
      .then((res) => {
        setMessage(res.message);
        closeModal();
        reload();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-3">
      <Select
        label="Currency"
        name="contractCurrency"
        placeholder="Select Currency"
        containerClassname={cn(
          "w-full grid grid-cols-[120px_auto] items-center",
          loading ? "pointer-events-none bg-primary-50" : ""
        )}
        className="!h-10"
        options={
          currency?.map(({ currency }) =>
            addOption(currency, currency, currency)
          ) || []
        }
        formData={formData}
        onChange={handleOnChange}
      />
      <InputField
        label="Custom Rate"
        placeholder="Current Rate"
        name="contractCurrencyRate"
        parentClassName="grid grid-cols-[120px_auto] items-center"
        className=""
        formData={formData}
        onChange={handleOnChange}
        disabled={formData.contractCurrency === "USD"}
      />
      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          disabled={loading} // if you have loading state
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          loading={loading} // if you have loading state
          onClick={handleUpdateCurrency}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalUpdatePremiumCurrency = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog
      open={modalType === "update-premium-currency"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Currency</DialogTitle>
          <DialogDescription className="flex gap-1">
            Product Id : <CopyWrapper content={modalData?.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdatePremiumCurrency;
