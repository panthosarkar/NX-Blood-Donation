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
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { addOption } from "@/bik-lib/utils/option";
import {
  AnimatedInputField,
  AnimatedTextArea,
  EmailInputField,
  PhoneInputField,
  Select,
} from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";
import { Button } from "@bikiran/button";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();

  const [formData, setFormData] = useState<
    TUserCreatePayload & {
      status: string;
    }
  >({
    ...modalData,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { post } = useApi();

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdateUser = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    post(`/admin/user/update`, formData)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="pt-4" onSubmit={handleUpdateUser}>
      <div className="space-y-3.5 mb-5">
        <div className="flex items-center gap-2">
          <AnimatedInputField
            label="Name"
            name="name"
            formData={formData}
            onChange={handleOnChange}
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
          />
          <PhoneInputField
            label="Phone"
            name="phone"
            formData={formData}
            onChange={handleOnChange}
          />
        </div>
        {/* <Select onValueChange={(v) => {}}>
          <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0 h-[45px] text-sm font-medium text-primary-700">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="text-sm font-medium text-primary-700">
            {["active", "inactive"].map((option: any) => (
              <SelectItem key={option} value={option}>
                {capitalizeFirstLetter(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        <Select
          label="Select Status"
          placeholder={capitalizeFirstLetter(formData.status)}
          options={["active", "inactive"].map((option) =>
            addOption(option, capitalizeFirstLetter(option), option)
          )}
          name="status"
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
          Update
        </Button>
      </div>
    </form>
  );
};
const ModalUpdateUser: FC = () => {
  const { modalType, closeModal, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "update-user"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        <DialogBody>{modalData && <ModalContent />}</DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateUser;
