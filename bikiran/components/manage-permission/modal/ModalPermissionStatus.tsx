/* eslint-disable no-unused-vars */
import { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { AnimatedTextArea, Select } from "@bikiran/inputs";
import { addOption } from "@/bik-lib/utils/option";
import { Button } from "@bikiran/button";
import { useManagePermission } from "../context/ManagePermissionProvider";
import useApi from "@/bik-lib/utils/useApi";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { modalData, setMessage } = useTemplate();
  const [formData, setFormData] = useState<any>({
    currencyId: modalData?.id || 0,
    status: modalData?.status || "",
    note: "",
  });

  const { put } = useApi();
  const { reload } = useManagePermission();

  const status = ["Active", "Inactive"];
  const permissionId = modalData?.id || 0;

  const handleOnChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setMessage("Updating...");
    put(`/admin/founder/permission/${permissionId}/edit-status`, {
      status: formData.status,
      note: formData.note,
    })
      .then(({ message }) => {
        closeModal();
        reload();

        setMessage(message);
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="w-full flex justify-between items-center">
        <span className=" font-medium text-base text-primary">Status</span>
        <Select
          formData={formData}
          label={""}
          placeholder="Select Status"
          name="status"
          onChange={handleOnChange}
          className="w-[223px]"
          options={status.map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
        />
      </div>
      <AnimatedTextArea
        formData={formData}
        name="note"
        label="Note"
        className="h-[115px] "
        onChange={handleOnChange}
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
          title="Save"
          className="px-3 py-2"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalPermissionStatus: FC = () => {
  const { closeModal, modalType, modalData } = useTemplate();

  return (
    <Dialog
      open={modalType === "update-permission-status"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <span className=" modal-subtitle">{modalData?.title}</span>
        </DialogHeader>
        <DialogBody className="!min-h-1 ">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPermissionStatus;
