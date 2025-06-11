import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/bikiran/components/ui/dialog";
import React, { FC, useState } from "react";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useCurrencyConfContext } from "../context/CurrencyConfProvider";
import { InputField } from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import useApi from "@/bik-lib/utils/useApi";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const { modalData, setMessage } = useTemplate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    currencyId: "",
    newRate: modalData?.rate || "",
  });

  const { put } = useApi();
  const { reload } = useCurrencyConfContext();

  const currencyId = modalData?.id || 0;

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setMessage("Updating...");
    put(`/admin/billing/currency-configuration/${currencyId}/update-rate`, {
      rate: Number(formData?.newRate),
    })
      .then(({ message }) => {
        reload();
        closeModal();
        setMessage(message);
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* <Select
                formData={formData}
                label='Currency'
                name='currency'
                onChange={handleChange}
                options={data ? data.map((item) => ({ id: item.id, title: item.currency, label: item.currency, value: item.id.toString() })) : []}
                placeholder='Select Currency'
            /> */}
      <InputField
        type="text"
        label="Rate"
        name="newRate"
        placeholder="Enter rate"
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
          title="Update"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const CurrencyConfUpdateModal = () => {
  const { modalType, closeModal, setMessage, modalData } = useTemplate();

  return (
    <Dialog open={modalType === "update-currency"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Currency Rate</DialogTitle>
          <span className=" modal-subtitle">{modalData?.title}</span>
        </DialogHeader>
        <DialogBody>
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyConfUpdateModal;
