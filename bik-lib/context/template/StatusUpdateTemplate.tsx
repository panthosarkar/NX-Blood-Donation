/* eslint-disable no-unused-vars */
import { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { TFormEvent, TInputChangeEvent, TState } from "@/bik-lib/types/event";
import { TStatusTemplate } from "@/bik-lib/context/template/TemplateProvider";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedTextArea, Select } from "@bikiran/inputs";
import { Button } from "@bikiran/button";

type TUpdateStatusPayload = {
  status: string;
  note: string;
};

const ModalBody: FC<{
  setStatus: TState<TStatusTemplate | null>;
  status: TStatusTemplate | null;
  templateLoading: boolean;
}> = ({ setStatus, status, templateLoading }) => {
  const { array, clickAction, defaultValue } = status || {
    array: [],
    clickAction: () => {},
    defaultValue: "",
  };
  const [formData, setFormData] = useState<TUpdateStatusPayload>({
    status: defaultValue?.toLowerCase() || "",
    note: "",
  });

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    clickAction(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <Select
        formData={formData}
        label={"Status"}
        placeholder="Select Status"
        name="status"
        onChange={handleOnChange}
        containerClassname="grid grid-cols-2 items-center"
        options={
          array.map((item: any) =>
            addOption(item, capitalizeFirstLetter(item), item)
          ) || []
        }
      />

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
          disabled={templateLoading}
          onClick={() => setStatus(null)}
        />
        <Button
          variant="secondary"
          title="Save"
          className="px-3 py-2    "
          type="submit"
          loading={templateLoading}
        />
      </div>
    </form>
  );
};

const StatusUpdateTemplate: FC<{
  setStatus: TState<TStatusTemplate | null>;
  status: TStatusTemplate | null;
  templateLoading: boolean;
}> = ({ setStatus, status, templateLoading }) => {
  const { name } = status || {};
  return (
    <Dialog open={status !== null} onOpenChange={() => setStatus(null)}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <small>{name}</small>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody
            status={status}
            setStatus={setStatus}
            templateLoading={templateLoading}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateTemplate;
