import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Button } from "@bikiran/button";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { AnimatedInputField, Select } from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";
import { usePremiumInfo } from "../context/PremiumInfoProvider";
import { addOption } from "@/bik-lib/utils/option";
import { InputField } from "@bikiran/inputs";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    contractDuration: modalData?.contractDuration,
    contractUnitName: modalData?.contractUnitName,
  });

  const { post } = useApi();
  const { reload, data } = usePremiumInfo();

  const unitNames = data?.filters?.unitNames;

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateDuration = () => {
    post(`/admin/premium-contract/${modalData?.id}/change-duration`, formData)
      .then((res) => {
        setMessage(res.message);
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
    <div className="space-y-3">
      <InputField
        formData={formData}
        name="contractDuration"
        label="Duration"
        placeholder="Duration"
        parentClassName="grid grid-cols-[100px_auto] items-center"
        className="mt-3"
        onChange={handleChange}
      />
      <Select
        formData={formData}
        name="contractUnitName"
        label="Unit Name"
        containerClassname="grid grid-cols-[100px_auto] items-center"
        onChange={handleChange}
        options={unitNames?.map((unit: any) => addOption(unit, unit, unit))}
      />

      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          disabled={loading} // if you have loading state
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          loading={loading} // if you have loading state
          onClick={updateDuration}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalUpdateDuration = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog
      open={modalType === "update-premium-duration"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Duration</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateDuration;
