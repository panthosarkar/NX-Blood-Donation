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
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedTextArea, Select } from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import { useUserProp } from "../context/UserPropertiesProvider";
import { TUserProp } from "../UserPropType";

const ModalBody: FC<{
  closeModal: () => void;
  modalData: TUserProp;
}> = ({ closeModal, modalData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setMessage } = useTemplate();
  const [formData, setFormData] = useState<any>({
    status: modalData?.status || "",
    note: "",
  });
  const { status } = useUserProp();

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const updateUserPropStatus = (payload: any, userId: number) => {
    setLoading(true);
    setMessage("Updating...");
    // put(`/user/prop/${userId}/change-billing-status`, {
    //   payload,
    // })
    //   .then(({ message }) => {
    //     setMessage(message);
    //     reload();
    //   })
    //   .catch((err: Error) => {
    //     setMessage(err.message);
    //   });
  };
  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateUserPropStatus(formData, modalData.id);
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
  const { closeModal, modalType, modalData } = useTemplate();

  return (
    <Dialog
      open={modalType === "status-userProp-Update"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} modalData={modalData} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalStatusChange;
