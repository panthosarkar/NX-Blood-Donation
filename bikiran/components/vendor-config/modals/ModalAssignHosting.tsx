import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "@bikiran/button";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import { AnimatedInputField } from "@bikiran/inputs";
import { useUnlocatedHosting } from "../context/ServerConfigProvider";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import useApi from "@/bik-lib/utils/useApi";

type TPayload = {
  hostname: string;
  username: string;
};

const ModalBody: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TPayload>({
    hostname: "",
    username: "",
  });

  const handleChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev: TPayload) => ({ ...prev, [name]: value }));
    }
  };

  const { reload } = useUnlocatedHosting();
  const { setMessage, closeModal } = useTemplate();

  const { post } = useApi();

  const handleSubmit = async (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);

    try {
      const { message } = await post(
        `/admin/hosting/cp-unlocated/${formData.hostname}/${formData.hostname}/assign`,
        formData
      );
      setMessage(message);
      reload();
      closeModal();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <AnimatedInputField
        formData={formData}
        name="hostname"
        label="Hostname"
        type="text"
        className="h-10"
        onChange={handleChange}
      />
      <AnimatedInputField
        formData={formData}
        name="username"
        label="Username"
        type="text"
        className="h-10"
        onChange={handleChange}
      />

      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          disabled={loading}
          onClick={closeModal}
          className="w-[100px] h-10"
        />
        <Button
          variant="secondary"
          type="submit"
          title="Save"
          loading={loading}
          className="w-[100px] h-10"
        />
      </div>
    </form>
  );
};

const ModalAssignHosting: FC = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog open={modalType === "assign-hosting"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Assign Hosting</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalBody />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAssignHosting;
