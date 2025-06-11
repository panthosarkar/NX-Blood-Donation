/* eslint-disable no-unused-vars */
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { InputDate } from "@/bik-lib/lib/InputFields";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { AnimatedTextArea, InputField } from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import useApi from "@/bik-lib/utils/useApi";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { post } = useApi();
  const { setMessage } = useTemplate();
  const [formData, setFormData] = useState<any>({
    tokenName: "",
    dateExpired: "",
    description: "",
  });
  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  const createToken = (payload: any) => {
    post(`/api/api-access-token`, payload)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
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
    createToken(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputField
        type="text"
        label="Token Name"
        name="tokenName"
        placeholder='e.g. "My Token"'
        formData={formData}
        onChange={handleChange}
      />
      <InputDate
        name="dateExpired"
        formData={formData}
        onChange={handleChange}
      />
      <AnimatedTextArea
        label="Description"
        name="description"
        formData={formData}
        onChange={handleChange}
        className="h-32"
      />
      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          className="w-[100px] h-10 text-base"
          onClick={closeModal}
        />
        <Button
          variant="secondary"
          title="Create"
          className="w-[100px] h-10 text-base"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalCreateToken: FC<{}> = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "create-token"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Create New Token</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-2 overflow-visible">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateToken;
