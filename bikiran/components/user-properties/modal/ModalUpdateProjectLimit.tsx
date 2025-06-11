import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "@bikiran/button";
import { InputField } from "@bikiran/inputs";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useUserProp } from "../context/UserPropertiesProvider";
import { FC, useState } from "react";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import useApi from "@/bik-lib/utils/useApi";

const ModalBody: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { setMessage, closeModal, modalData } = useTemplate();
  const [formData, setFormData] = useState<any>({
    projectLimit: modalData?.projectLimit || 0,
  });

  const { reload } = useUserProp();
  const { put } = useApi();

  const userId = modalData?.id;

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    try {
      const { message } = await put(
        `/admin/user/prop/${userId}/change-project-limit`,
        formData
      );
      setMessage(message);
      reload();
      closeModal();
    } catch (err: any) {
      setMessage(err?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <InputField
        label="Project Limit"
        name="projectLimit"
        placeholder="Ex: 10"
        formData={formData}
        onChange={handleOnChange}
        className="h-10"
      />

      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          className="w-[90px] h-10"
          disabled={loading}
          onClick={closeModal}
        />
        <Button
          variant="secondary"
          type="submit"
          title="Update"
          loading={loading}
          className="w-[90px] h-10"
        />
      </div>
    </form>
  );
};

const ModalUpdateProjectLimit: FC = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog
      open={modalType === "update-project-limit"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Project Limit</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateProjectLimit;
