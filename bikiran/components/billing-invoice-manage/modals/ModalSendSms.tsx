import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { AnimatedInputField, AnimatedTextArea } from "@bikiran/inputs";
import { Button } from "@bikiran/button";

type TProps = {
  closeModal: () => void;
};
type TSendSMS = {
  number: string;
  message: string;
};

const defaultFormData: TSendSMS = {
  number: "",
  message: "",
};

const ModalContent: FC<TProps> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TSendSMS>({
    ...defaultFormData,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePush = () => {
    //add your api calls here
  };

  return (
    <form onSubmit={handlePush} className="space-y-4">
      <AnimatedInputField
        formData={formData}
        label={"Title"}
        name="title"
        onChange={handleOnChange}
        className="mt-2"
      />
      <AnimatedTextArea
        formData={formData}
        label={"Description"}
        name="description"
        className="h-28"
        onChange={handleOnChange}
      />
      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          disabled={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button variant="green" className="w-24 h-10" loading={loading}>
          Send
        </Button>
      </div>
    </form>
  );
};

const ModalSendSms = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "send-sms"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Send SMS</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSendSms;
