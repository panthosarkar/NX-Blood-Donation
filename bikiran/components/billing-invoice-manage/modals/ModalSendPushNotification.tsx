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

type TPushNotificationPayload = {
  title: string;
  description: string;
  logo: string;
  image: string;
};

const defaultFormData: TPushNotificationPayload = {
  title: "",
  description: "",
  logo: "",
  image: "",
};

const ModalContent: FC<TProps> = ({ closeModal }) => {
  // const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<TPushNotificationPayload>({
    ...defaultFormData,
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const yourHandlerName = () => {};

  return (
    <div className="space-y-4 mt-2">
      {/* Your Modal Content Goes here */}
      <AnimatedInputField
        formData={formData}
        label={"Title"}
        name="title"
        onChange={handleOnChange}
      />
      <AnimatedTextArea
        formData={formData}
        label={"Description"}
        name="description"
        className="h-28"
        onChange={handleOnChange}
      />
      <AnimatedInputField
        formData={formData}
        label={"Logo"}
        name="logo"
        onChange={handleOnChange}
      />
      <AnimatedInputField
        formData={formData}
        label={"Image"}
        name="image"
        onChange={handleOnChange}
      />
      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          // disabled={loading} // if you have loading state
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          // loading={loading} // if you have loading state
          onClick={yourHandlerName}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

const ModalSendPushNotification = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog
      open={modalType === "send-push-notification"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Send Push Notification</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSendPushNotification;
