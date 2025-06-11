import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { AnimatedInputField, AnimatedSelect } from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import { addOption } from "@/bik-lib/utils/option";
import { usePaymentMethod } from "../context/PaymentMethodProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();
  const { data } = usePaymentMethod();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const { currencyOptions } = data.filters;

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateStatus = () => {
    setLoading(true);
    setMessage("Updating status...");
    if (modalData.id > 0) {
      // put(`/admin/gateway/configuration/${modalData.id || 0}/update-status?status={status}`, {status})
      //   .then(() => {
      //     reload();
      //     closeModal();
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
    }
  };

  return (
    <div className="space-y-3.5">
      <AnimatedInputField
        formData={formData}
        name="providerName"
        label="Provider Name"
        onChange={handleChange}
      />
      <AnimatedInputField
        formData={formData}
        name="title"
        label="Title"
        onChange={handleChange}
      />{" "}
      <AnimatedInputField
        formData={formData}
        name="sub-title"
        label="Sub Title"
        onChange={handleChange}
      />
      <AnimatedSelect
        className="h-[45px] mt-1"
        name="contractCurrency"
        label=""
        onChange={handleChange}
        placeholder="Select Currency"
        options={
          currencyOptions?.map((currency) =>
            addOption(currency.currency, currency.currency, currency.currency)
          ) || []
        }
        formData={formData}
      />
      <AnimatedInputField
        label="Currency Rate"
        name="contractCurrencyRate"
        className="w-56 mt-1"
        formData={formData}
        onChange={handleChange}
        disabled={formData.contractCurrency === "USD"}
      />
      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          disabled={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant={"secondary"}
          className="w-24 h-10"
          loading={loading}
          onClick={updateStatus}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

const ModalAddPaymentMethod = () => {
  const { closeModal, modalType, setMessage } = useTemplate();
  return (
    <Dialog open={modalType === "add-payment-method"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>
        <DialogBody className="min-h-10">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddPaymentMethod;
