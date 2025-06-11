import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import {
  AnimatedInputField,
  AnimatedTextArea,
  AnimatedSelect,
} from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import { CopyWrapper } from "@bikiran/utils";
import useApi from "@/bik-lib/utils/useApi";
import { usePremiumInfo } from "../context/PremiumInfoProvider";
import { addOption } from "@/bik-lib/utils/option";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { modalData, setMessage } = useTemplate();
  const [formData, setFormData] = useState<Record<string, any>>({
    title: modalData?.title || "",
    description: modalData?.description || "",
    subType: modalData?.subType || "",
    identityName: modalData?.identityName || "",
  });

  const { reload, data } = usePremiumInfo();
  const { post } = useApi();
  const handleChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtypes = data?.filters?.subtypes;

  const updateHostingPackage = () => {
    setLoading(true);
    setMessage("Updating...");
    post(`/admin/premium-contract/${modalData?.id}/update-basic`, formData)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
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
    updateHostingPackage();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <AnimatedInputField
        formData={formData}
        name="title"
        label="Title"
        type="text"
        className="h-[50px] "
        onChange={handleChange}
      />
      <AnimatedTextArea
        formData={formData}
        name="description"
        label="Description"
        className="h-[50px] "
        onChange={handleChange}
      />
      <AnimatedInputField
        formData={formData}
        label="Identity Name"
        placeholder="ex : example@email.com or www.bikiran.com"
        name="identityName"
        onChange={handleChange}
      />
      <AnimatedSelect
        label=""
        name="subType"
        placeholder="Select Subtype"
        options={
          subtypes?.map((item) => addOption(item.key, item.title, item.key)) ||
          []
        }
        className="overflow-hidden [&>.value]:line-clamp-1 "
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
          className="px-3 py-2    "
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalUpdatePremiumBasic: FC = () => {
  const { closeModal, modalType, modalData } = useTemplate();

  return (
    <Dialog
      open={modalType === "premium-update-basic"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Basic Info</DialogTitle>
          <DialogDescription className="uppercase flex gap-1 ">
            Subscription Id : <CopyWrapper content={modalData?.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdatePremiumBasic;
