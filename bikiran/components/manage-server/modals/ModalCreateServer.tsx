/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent, TState } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { raidLevels, TServerCreatePayload } from "../ManageServerType";
import { useServerInfo } from "../context/ManageServerProvider";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import {
  AnimatedInputField,
  AnimatedSelect,
  ValidationInputField,
} from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import useApi from "@/bik-lib/utils/useApi";

const initialFormData: TServerCreatePayload = {
  hostname: "",
  primaryIp: "",
  type: "",
  title: "",
  cpu: "",
  ram: "",
  storage: "",
  bandwidth: "",
  network: "",
  os: "",
  raid: "",
};

const ModalBody: React.FC<{
  closeModal: () => void;
  setMessage: (message: string) => void;
}> = ({ closeModal, setMessage }) => {
  const [formData, setFormData] =
    useState<TServerCreatePayload>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [fetchingIp, setFetchingIp] = useState<{
    loading: boolean;
    valid?: boolean;
  }>({
    loading: false,
    valid: undefined,
  });

  const { post, get } = useApi();
  const { reload, serverType } = useServerInfo();

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  const createServer = (payload: TServerCreatePayload) => {
    setLoading(true);
    setMessage("Creating server...");
    post(`/admin/server/create`, payload)
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
    createServer(formData);
  };

  const getPrimaryIp = (domain: string) => {
    if (formData.hostname.length > 5) {
      const path = `/dns/${domain}/a`;
      setFetchingIp((prev) => ({ ...prev, loading: true }));
      get(path)
        .then((data) => {
          if (data.data?.ipAddresses?.length !== 0) {
            setFormData((prev: any) => ({
              ...prev,
              primaryIp: data.data?.ipAddresses,
            }));
            setFetchingIp((prev) => ({ ...prev, valid: true }));
          } else {
            setFetchingIp((prev) => ({ ...prev, valid: false }));
          }
        })
        .catch((err: Error) => {
          if (formData.hostname.length === 0) {
            setMessage("Please enter a valid hostname");
          }
          setMessage(err.message);
          setFetchingIp((prev) => ({ ...prev, valid: false }));
        })
        .finally(() => {
          setFetchingIp((prev) => ({ ...prev, loading: false }));
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex gap-4">
        <AnimatedInputField
          formData={formData}
          label={"Hostname"}
          name="hostname"
          onChange={handleChange}
          onBlur={(e) => getPrimaryIp(e.target.value)}
        />
        <ValidationInputField
          formData={formData}
          label={"Primary IP"}
          name="primaryIp"
          onChange={handleChange}
          valid={
            fetchingIp.valid &&
            formData.primaryIp.length > 0 &&
            formData.hostname.length > 0
          }
          loading={fetchingIp.loading}
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
          label={"CPU"}
          name="cpu"
          onChange={handleChange}
          placeholder="ex: Intel Xeon-E 2136 - 6c/12t"
          className="[&>input]:placeholder:text-sm"
        />
        <AnimatedInputField
          formData={formData}
          label={"RAM"}
          name="ram"
          onChange={handleChange}
          placeholder="ex: 64 GB ECC 2666 MHz"
          className="[&>input]:placeholder:text-sm"
        />
      </div>
      <div className="flex gap-4">
        <AnimatedInputField
          formData={formData}
          label={"Storage"}
          name="storage"
          onChange={handleChange}
          placeholder="ex: 2×1.92 TB SSD NVMe"
          className="[&>input]:placeholder:text-sm"
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
          placeholder="ex: Ubuntu 20.04 LTS"
          className="[&>input]:placeholder:text-sm"
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
          title="Create"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalCreateServer: React.FC<{}> = () => {
  const { closeModal, setMessage, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "create-server"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader className="border-b">
          <DialogTitle className="text-primary text-xl font-medium">
            Create New Server
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} setMessage={setMessage} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateServer;
