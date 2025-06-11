/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TDomainPackagePayload } from "../DomainTypes";
import { useDomain } from "../context/DomainPricingProvider";
import { Button } from "@bikiran/button";
import { AnimatedInputField, CalculationInputField } from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";

const ModalBody: React.FC<{
  closeModal: () => void;
  setMessage: (message: string) => void;
}> = ({ closeModal, setMessage }) => {
  const [formData, setFormData] = useState<TDomainPackagePayload>({
    price: 0,
    pricePromotion: 0,
    priceTransfer: 0,
    priceRedemption: 0,
    priceRestore: 0,
    minDuration: 0,
    defaultDuration: 0,
    vendor: "",
  });
  const [loading, setLoading] = useState(false);

  const { post } = useApi();
  const { reFetch } = useDomain();

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setMessage("Creating project...");
    post(`/admin/domain/packages/create`, { ...formData })
      .then(({ message }) => {
        if (message) {
          setMessage(message);
        }
        reFetch();
        closeModal();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex gap-2">
        <AnimatedInputField
          type="text"
          label="Type"
          name="type"
          formData={formData}
          onChange={handleChange}
        />
        <AnimatedInputField
          type="text"
          label="Sub Type"
          name="subType"
          formData={formData}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-2">
        <AnimatedInputField
          type="text"
          label="Title"
          name="title"
          formData={formData}
          onChange={handleChange}
        />
        <AnimatedInputField
          type="text"
          label="Class Key"
          name="classKey"
          formData={formData}
          onChange={handleChange}
        />
      </div>
      <AnimatedInputField
        type="text"
        label="TLD"
        name="tld"
        formData={formData}
        onChange={handleChange}
      />
      <div className="flex gap-2">
        <CalculationInputField
          label="Price"
          name="price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Promotion Price"
          name="pricePromotion"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Transfer Price"
          name="priceTransfer"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Renewal Price"
          name="priceRenewal"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Redemption Price"
          name="priceRedemption"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Restore Price"
          name="restorePrice"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Min Duration"
          name="minDuration"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Default Duration"
          name="defaultDuration"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <AnimatedInputField
        type="text"
        label="Vendor"
        name="vendor"
        formData={formData}
        onChange={handleChange}
      />
      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          className="w-[100px] h-10"
          onClick={closeModal}
        />
        <Button
          variant="secondary"
          title="Create"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalCreateDomainPackage: React.FC<{}> = () => {
  const { closeModal, setMessage, modalType } = useTemplate();
  return (
    <Dialog
      open={modalType === "create-domain-package"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader className="border-b">
          <DialogTitle className="text-primary text-xl font-medium">
            Create New Package
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} setMessage={setMessage} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateDomainPackage;
