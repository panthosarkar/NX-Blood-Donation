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
import { addOption } from "@/bik-lib/utils/option";
import useApi from "@/bik-lib/utils/useApi";
import { useHostingList } from "../context/HostingListProvider";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();
  const { currencies, reload } = useHostingList();
  const { put } = useApi();

  const [formData, setFormData] = useState<{
    contractCurrency: string;
    contractCurrencyRate: string;
  }>({
    contractCurrency: modalData?.contractCurrency || "",
    contractCurrencyRate: modalData?.contractCurrencyRate || "",
  });
  const [loading, setLoading] = useState<boolean>(false);

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
          currencies
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
    put(`/admin/hosting/manage/${modalData?.id}/update-currency`, formData)
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
          "w-full grid grid-cols-[250px_auto] items-center",
          loading ? "pointer-events-none bg-primary-50" : ""
        )}
        className="!h-10"
        options={
          currencies?.map(({ currency }) =>
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
        parentClassName="grid grid-cols-[250px_auto] items-center"
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

const ModalUpdateCurrency = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog
      open={modalType === "update-hosting-currency"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Currency</DialogTitle>
          <DialogDescription className="flex gap-1">
            Product Id : <CopyWrapper content={modalData?.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateCurrency;
