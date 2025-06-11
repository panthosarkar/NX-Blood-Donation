import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { TState } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import { Button } from "@bikiran/button";
import { useEnConfig } from "../context/EnConfigProvider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import useApi from "@/bik-lib/utils/useApi";

const EmailInput: FC<{
  setFormData: TState<{
    emails: string[];
  }>;
  formData: {
    emails: string[];
  };
}> = ({ setFormData, formData }) => {
  return (
    <div className="w-full mb-4">
      <div className="text-primary mb-1">
        Type Email <span className="text-sm">(Max 5 emails can be added)</span>
      </div>
      <ReactMultiEmail
        placeholder="Input your email"
        emails={formData?.emails}
        onChange={(emails: string[]) => {
          // Allow setting emails only if the count is less than or equal to 5
          if (emails.length <= 5) {
            setFormData((prev: any) => ({
              ...prev,
              emails: emails,
            }));
          }
        }}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};

const ModalContent: FC = () => {
  const { authInfo } = useAuth2();
  const { post } = useApi();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    emails: string[];
  }>({
    emails: [authInfo?.currentUser?.email],
  });
  // console.log(formData, "+++++");
  const { closeModal, setMessage, modalData } = useTemplate();

  const { reload } = useEnConfig();

  const sendEmail = () => {
    setMessage("Sending email...");
    setLoading(true);

    post(
      `/admin/notification/email/config/${modalData?.key}/send-test-email`,
      formData?.emails
    )
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((error: Error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isActive = formData?.emails?.length > 0;

  return (
    <div>
      <EmailInput setFormData={setFormData} formData={formData} />

      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          disabled={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          disabled={!isActive}
          loading={loading}
          onClick={sendEmail}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

const ModalSendEmail = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "send-email"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Send Email</DialogTitle>
        </DialogHeader>
        <DialogBody className="min-h-max">
          {modalData && <ModalContent />}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSendEmail;
