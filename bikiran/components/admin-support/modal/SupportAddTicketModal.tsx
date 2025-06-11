import React, { useEffect, useState } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TCreateTicket, TProject } from "../SupportTypes";
import { departments } from "../SupportConstants";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useAdminSupportData } from "../context/SupportAdminDataProvider";
import { AnimatedTextArea, InputField, Select } from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent = () => {
  const [formData, setFormData] = useState<TCreateTicket>({
    subject: "",
    project: 0,
    department: "",
    message: "",
  });
  const [projectInfo, setProjectInfo] = useState<TProject[]>([]);
  const { closeModal, setMessage } = useTemplate();
  const { reFetching, setReloadKey, reloadKey, reloadTicket } =
    useAdminSupportData();
  const { post, get } = useApi();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (formData) {
      handleCreateTicket(formData);
      setFormData({
        subject: "",
        project: 0,
        department: "",
        message: "",
      });
    }
  };

  const handleOnChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // handler to create a new ticket
  const handleCreateTicket = (ticketData: TCreateTicket) => {
    post(`/admin/ticket/create`, ticketData)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setReloadKey(-2);
        reloadTicket(); // Reload the ticket list after successful creation
      });
  };

  useEffect(() => {
    get(`project`)
      .then(({ data }) => {
        setProjectInfo(data?.projects as TProject[]);
      })
      .catch((err) => {
        setMessage(err);
      })
      .finally(() => {
        setReloadKey(-2);
      });
  }, [reloadKey]);

  const options =
    projectInfo?.map((project: any) => ({
      id: project.id,
      title: project.title,
      value: project.title,
    })) || [];

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-2.5">
        <InputField
          type="text"
          label="Subject"
          name="subject"
          placeholder="Enter Subject"
          formData={formData}
          onChange={handleOnChange}
          className="w-full"
        />
        <Select
          options={options}
          label=""
          placeholder="Select Project"
          name="project"
          formData={formData}
          onChange={handleOnChange}
          className="w-full"
        />
        <Select
          options={departments}
          placeholder="Select Department"
          label=""
          name="department"
          formData={formData}
          onChange={handleOnChange}
          className="w-full"
        />
        <AnimatedTextArea
          formData={formData}
          label="Write your message"
          name="message"
          onChange={handleOnChange}
        />

        <div className="flex justify-end gap-2 h-9">
          <Button
            variant="gray"
            type="button"
            className="bg-primary-100 text-primary-900 h-full"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="bg-secondary text-white h-full"
            type="submit"
            loading={reFetching}
            disabled={reFetching}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

const SupportAddTicketModal = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "open-ticket"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader className="border-b">
          <DialogTitle className="text-primary text-xl font-medium">
            Open New Ticket
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default SupportAddTicketModal;
