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
import { AnimatedInputField, AnimatedSelect } from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";
import { addOption } from "@/bik-lib/utils/option";
import { useHostingList } from "../context/HostingListProvider";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    contractDuration: string;
    contractUnitName: string;
  }>({
    contractDuration: modalData?.contractDuration,
    contractUnitName: modalData?.contractUnitName,
  });

  const { put } = useApi();
  const { reload } = useHostingList();

  const unitNames = [
    { id: 1, unitName: "DAY" },
    { id: 2, unitName: "MONTH" },
    { id: 3, unitName: "YEAR" },
  ];

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateDuration = () => {
    put(`/admin/hosting/manage/${modalData?.id}/update-duration`, formData)
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
      <AnimatedInputField
        formData={formData}
        name="contractDuration"
        label="Duration"
        placeholder="Duration"
        className="mt-3"
        onChange={handleChange}
      />
      <AnimatedSelect
        formData={formData}
        name="contractUnitName"
        label=""
        onChange={handleChange}
        options={unitNames?.map((unit: any) =>
          addOption(unit.id, unit.unitName, unit.unitName)
        )}
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
      open={modalType === "update-hosting-duration"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Duration</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateDuration;
