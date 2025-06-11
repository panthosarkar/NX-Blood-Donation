import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useHostingList } from "../context/HostingListProvider";
import { TFormEvent } from "@/bik-lib/types/event";
import { AnimatedInputField, ValidationInputField } from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";
import { Button } from "@bikiran/button";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { reload } = useHostingList();

  const { put } = useApi();
  const { modalData, setMessage } = useTemplate();

  const [formData, setFormData] = useState<any>({
    title: modalData?.title || "",
    domainName: modalData?.domainName || "",
  });

  const updateHostingPackage = () => {
    setLoading(true);
    setMessage("Updating...");
    put(
      `/admin/hosting/manage/${modalData.id}/update-basic`,

      { title: formData.title, domainName: formData.domainName }
    )
      .then(({ message }) => {
        setMessage(message);
        if (reload) {
          closeModal();
          reload();
        }
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
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <ValidationInputField
        formData={formData}
        name="domainName"
        label="Domain Name"
        type="text"
        className="h-[50px] "
        onChange={(e) =>
          setFormData({ ...formData, domainName: e.target.value })
        }
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
          title="Save"
          className="px-3 py-2    "
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalUpdateBasic: FC = () => {
  const { closeModal, modalType, modalData } = useTemplate();

  return (
    <Dialog open={modalType === "update-basic"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Hosting</DialogTitle>
          <span className=" modal-subtitle">{modalData?.title}</span>
        </DialogHeader>
        <DialogBody className="!min-h-1 overflow-visible">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateBasic;
