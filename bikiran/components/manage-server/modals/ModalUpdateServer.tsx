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
import {
  raidLevels,
  TServerCreatePayload,
  TServerData,
} from "../ManageServerType";
import { addOption } from "@/bik-lib/utils/option";
import { useServerInfo } from "../context/ManageServerProvider";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { AnimatedInputField, AnimatedSelect } from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import useApi from "@/bik-lib/utils/useApi";

const ModalBody: React.FC<{
  closeModal: () => void;
  setMessage: (message: string) => void;
  modalData: TServerData;
}> = ({ closeModal, setMessage, modalData }) => {
  const [formData, setFormData] = useState<TServerCreatePayload>({
    type: modalData?.type,
    hostname: modalData?.hostname,
    primaryIp: modalData?.primaryIp,
    title: modalData?.title,
    cpu: modalData?.cpu,
    ram: modalData?.ram,
    storage: modalData?.storage,
    bandwidth: modalData?.bandwidth,
    network: modalData?.network,
    os: modalData?.os,
    raid: modalData?.raid,
  });
  const [loading, setLoading] = useState(false);

  const { post } = useApi();
  const { reload, serverType } = useServerInfo();

  const id = modalData?.id || 0;

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  const updateServerPackage = (payload: TServerCreatePayload) => {
    setLoading(true);
    setMessage("Updating Server Package...");
    post(`/admin/server/${id?.toString()}/update`, payload)
      .then(({ message }) => {
        if (message) {
          setMessage(message);
        }
        if (reload) {
          reload();
        }
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
    updateServerPackage(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex gap-4">
        <AnimatedInputField
          formData={formData}
          label={"Hostname"}
          name="hostname"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          label={"Primary IP"}
          name="primaryIp"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 items-center">
        <AnimatedSelect
          formData={formData}
          label={""}
          name="type"
          placeholder="Select Server Type"
          onChange={handleChange}
          options={serverType.map((type) =>
            addOption(type, capitalizeFirstLetter(type), type)
          )}
        />
        <AnimatedInputField
          formData={formData}
          label={"Server Title"}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <AnimatedInputField
          formData={formData}
          label={"Cpu"}
          name="cpu"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          label={"Ram"}
          name="ram"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <AnimatedInputField
          formData={formData}
          label={"Storage"}
          name="storage"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          label={"Bandwidth"}
          name="bandwidth"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <AnimatedInputField
          formData={formData}
          label={"Network"}
          name="network"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          label={"OS"}
          name="os"
          onChange={handleChange}
        />
      </div>
      <AnimatedSelect
        formData={formData}
        label={""}
        name="raid"
        placeholder="Select Raid"
        onChange={handleChange}
        options={raidLevels.map((items) =>
          addOption(items.id, capitalizeFirstLetter(items.title), items.value)
        )}
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

const ModalUpdateServer: React.FC<{}> = () => {
  const { closeModal, setMessage, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "update-server"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader className="border-b">
          <DialogTitle className="text-primary text-xl font-medium">
            Update Server Details
          </DialogTitle>
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

export default ModalUpdateServer;
