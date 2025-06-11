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
import { useUserProjectsList } from "../context/UserProjectsListProvider";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedTextArea, Select } from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";
import { Button } from "@bikiran/button";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { modalData, setMessage } = useTemplate();
  const [formData, setFormData] = useState<any>({
    status: modalData?.status || "",
    note: "",
  });
  const { reload, userProjectsData } = useUserProjectsList();

  const { post } = useApi();
  const status = userProjectsData.status;

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const updateUserProjects = (payload: any) => {
    setLoading(true);
    setMessage("Updating...");
    post(`/admin/user/Projects/${modalData?.id || 0}/update-status`, payload)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateUserProjects(formData);
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col gap-4 mt-3"
    >
      <div className="w-full flex justify-between items-center">
        <span className=" font-medium text-base text-primary">Status</span>
        <Select
          formData={formData}
          label={""}
          placeholder="Select Status"
          name="status"
          onChange={handleOnChange}
          className="w-[223px]"
          options={
            status?.map((item) =>
              addOption(item, capitalizeFirstLetter(item), item)
            ) || []
          }
        />
      </div>

      <AnimatedTextArea
        formData={formData}
        name="note"
        label="Note"
        className="h-28"
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
          className="px-3 py-2    "
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalStatusChange: FC = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog open={modalType === "status-Update"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalStatusChange;
