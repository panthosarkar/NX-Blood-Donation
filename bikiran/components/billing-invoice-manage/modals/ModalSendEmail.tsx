import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import {
  AnimatedInputField,
  AnimatedTextArea,
  EmailInputField,
} from "@bikiran/inputs";
import { Button } from "@bikiran/button";

type TProps = {
  closeModal: () => void;
};
type TSendEmailPayload = {
  emailAddress: string;
  subject: string;
  massage: string;
};
const defaultPayload: TSendEmailPayload = {
  emailAddress: "",
  subject: "",
  massage: "",
};

const ModalContent: FC<TProps> = ({ closeModal }) => {
  // const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<TSendEmailPayload>({
    ...defaultPayload,
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
      <EmailInputField
        formData={formData}
        label={"Email Address"}
        name="emailAddress"
        onChange={handleOnChange}
      />
      <AnimatedInputField
        formData={formData}
        label={"Subject"}
        name="subject"
        onChange={handleOnChange}
      />
      <div>
        {/* TODO: Need An toolbar that  will manipulate this  textarea */}
        <AnimatedTextArea
          formData={formData}
          label={"Message"}
          name="massage"
          onChange={handleOnChange}
          className="h-28"
        />
      </div>

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

const ModalSendEmail = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "send-email"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Send Email</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSendEmail;
