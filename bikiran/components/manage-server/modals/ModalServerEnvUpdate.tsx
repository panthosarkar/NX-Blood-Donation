import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent } from "@/bik-lib/types/event";
import { useServerInfo } from "../context/ManageServerProvider";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "@bikiran/button";
import useApi from "@/bik-lib/utils/useApi";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { reload, serverEnv } = useServerInfo();
  const { put } = useApi();
  const { modalData, setMessage } = useTemplate();
  const [formData, setFormData] = useState<{ environment: string }>({
    environment: modalData?.environment || "",
  });

  const updateServerEnvironment = (environment: string) => {
    setLoading(true);
    setMessage("Environment Updating...");
    put(
      `/admin/server/${modalData?.id}/update-environment?environment=${environment}`,
      {}
    )
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateServerEnvironment(formData.environment);
  };

  const handleClick = (item: string) => {
    setFormData({ environment: item });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className=" flex flex-col gap-3 mt-4">
        {serverEnv.map((item) => (
          <div key={item.key} className=" flex gap-2 items-center ">
            <Checkbox
              className={`border-primary ring-0 data-[state=checked]:border-secondary data-[state=checked]:bg-secondary rounded-full data-[state=checked]:text-white`}
              checked={formData?.environment === item.key}
              onClick={() => handleClick(item.key)}
              id={`ckk-${item.key}`}
            />
            <label htmlFor={`ckk-${item.key}`} className="cursor-pointer">
              {item.title}
            </label>
          </div>
        ))}
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
          title="Save"
          className="px-3 py-2"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalServerEnvUpdate: FC = () => {
  const { closeModal, modalType, modalData } = useTemplate();

  return (
    <Dialog open={modalType === "update-environment"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Environment </DialogTitle>
          <span className=" modal-subtitle">{modalData?.title}</span>
        </DialogHeader>
        <DialogBody className="!min-h-1 overflow-visible">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalServerEnvUpdate;
