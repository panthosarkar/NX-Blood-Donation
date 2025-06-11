import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { TUserCreatePayload } from "../userListType";
import { useUserList } from "../context/UserListProvider";
import {
  AnimatedInputField,
  AnimatedTextArea,
  EmailInputField,
  PhoneInputField,
} from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";
import { TApiResponse } from "@/bik-lib/types/response";
import { Button } from "@bikiran/button";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();
  const initialFormData: TUserCreatePayload = {
    name: modalData?.name || "",
    email: "",
    phone: "",
    organization: "",
    reference: "",
    note: "",
  };

  const [formData, setFormData] = useState<TUserCreatePayload>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);

  const { post } = useApi();
  const { reload } = useUserList();

  const handleOnChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateUser = (ev: TFormEvent) => {
    ev.preventDefault();
    setMessage("Creating user...");
    setLoading(true);
    post<TApiResponse<null>>(`/admin/user/create`, formData)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="pt-4" onSubmit={handleCreateUser}>
      <div className="space-y-3.5 mb-5">
        <div className="flex items-center gap-2">
          <AnimatedInputField
            label="Name"
            name="name"
            formData={formData}
            onChange={handleOnChange}
            required
          />
          <AnimatedInputField
            label="Organization"
            name="organization"
            formData={formData}
            onChange={handleOnChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <EmailInputField
            label="Email"
            name="email"
            formData={formData}
            onChange={handleOnChange}
            required
          />
          <PhoneInputField
            label="Phone"
            name="phone"
            formData={formData}
            onChange={handleOnChange}
          />
        </div>
        <AnimatedInputField
          label="Reference"
          name="reference"
          formData={formData}
          onChange={handleOnChange}
        />
        <AnimatedTextArea
          label="Note"
          name="note"
          formData={formData}
          onChange={handleOnChange}
          className="h-20"
        />
      </div>

      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          disabled={loading}
          onClick={closeModal}
          className="w-30 h-10"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          loading={loading}
          className="w-30 h-10"
        >
          Create
        </Button>
      </div>
    </form>
  );
};
const ModalCreateUser: FC = () => {
  const { modalType, closeModal, setMessage } = useTemplate();

  return (
    <Dialog open={modalType === "create-user"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateUser;
