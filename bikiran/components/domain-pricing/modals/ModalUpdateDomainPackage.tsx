/* eslint-disable no-unused-vars */
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TDomainPackagePayload, TDomainPrice } from "../DomainTypes";
import { useDomain } from "../context/DomainPricingProvider";
import { addOption } from "@/bik-lib/utils/option";
import { CalculationInputField, Select } from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";
import { Button } from "@bikiran/button";

const ModalBody: FC<{
  closeModal: () => void;
  setMessage: (message: string) => void;
  modalData: TDomainPrice;
}> = ({ closeModal, setMessage, modalData }) => {
  const [formData, setFormData] = useState<TDomainPackagePayload>({
    price: modalData?.price || 0,
    pricePromotion: modalData?.pricePromotion || 0,
    priceTransfer: modalData?.priceTransferIn || 0,
    priceRedemption: modalData?.priceRedemption || 0,
    priceRestore: modalData?.priceRestore || 0,
    minQuantity: modalData?.minQuantity || 0,
    selectedQuantity: modalData?.selectedQuantity || 0,
    vendor: modalData?.vendor || "",
  });
  const [loading, setLoading] = useState(false);
  const { post } = useApi();

  const { vendorData, reFetch } = useDomain();

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  //update Domain Package
  const updateDomainPackage = (formData: TDomainPackagePayload) => {
    const {
      minQuantity,
      selectedQuantity,
      price,
      pricePromotion,
      priceRedemption,
      priceRestore,
      priceTransfer,
      vendor,
    } = formData;
    const payload = {
      defaultDuration: parseFloat(selectedQuantity.toString()),
      minDuration: parseFloat(minQuantity.toString()),
      price: parseFloat(price.toString()),
      pricePromotion: parseFloat(pricePromotion.toString()),
      priceRedemption: parseFloat(priceRedemption.toString()),
      priceRestore: parseFloat(priceRestore.toString()),
      priceTransferIn: parseFloat(priceTransfer.toString()),
      vendor: vendor,
    };
    setLoading(true);
    setMessage("Creating project...");
    post(
      `/admin/domain/packages/${modalData?.id.toString() || ""}/update`,
      payload
    )
      .then(({ message }) => {
        if (message) {
          setMessage(message);
        }
        closeModal();
        reFetch();
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateDomainPackage(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex gap-2">
        <CalculationInputField
          label="Promotion Price"
          name="pricePromotion"
          currency="USD"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Renew Price"
          name="price"
          currency="USD"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Transfer Price"
          name="priceTransfer"
          currency="USD"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Redemption Price"
          name="priceRedemption"
          currency="USD"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Restore Price"
          name="priceRestore"
          currency="USD"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Min Duration"
          name="minQuantity"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Default Duration"
          name="selectedQuantity"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="w-full items-center">
        <Select
          label="Select Vendor"
          name="vendor"
          placeholder="Select Vendor"
          className="w-full"
          options={vendorData.map((item) =>
            addOption(item.key, item.vendorTitle, item.key)
          )}
          containerClassname="grid grid-cols-[150px_auto] gap-2 items-center"
          formData={formData}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          className="w-[100px] h-10"
          onClick={closeModal}
        />
        <Button
          variant="secondary"
          title="Update"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalUpdateDomainPackage: FC = () => {
  const { closeModal, setMessage, modalType, modalData } = useTemplate();

  return (
    <Dialog
      open={modalType === "update-domain-package"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Domain Package</DialogTitle>
          <span className=" modal-subtitle">{modalData?.tld}</span>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody
            closeModal={closeModal}
            setMessage={setMessage}
            modalData={modalData}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateDomainPackage;
