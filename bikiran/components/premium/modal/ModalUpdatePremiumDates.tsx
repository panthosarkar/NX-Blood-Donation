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
import useApi from "@/bik-lib/utils/useApi";
import { usePremiumInfo } from "../context/PremiumInfoProvider";
import { DateInputField } from "@bikiran/inputs";
import { GetDate } from "@/bik-lib/utils/date";
import dayjs from "dayjs";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    dateIssued: GetDate(modalData?.timeIssue),
    dateExpired: GetDate(modalData?.timeExpire),
  });

  const { post } = useApi();
  const { reload } = usePremiumInfo();

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateDuration = () => {
    const payload = {
      dateIssued: dayjs(formData.dateIssued).format("YYYY-MM-DD"),
      dateExpired: dayjs(formData.dateExpired).format("YYYY-MM-DD"),
    };
    post(`/admin/premium-contract/${modalData?.id}/update-dates`, payload)
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
      <div className="grid grid-cols-[120px_auto] items-center gap-3">
        <label htmlFor="" className="text-primary font-medium text-lg">
          Date Issued
        </label>
        <DateInputField
          formData={formData}
          name="dateIssued"
          className="w-full h-full"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-[120px_auto] items-center gap-3">
        <label htmlFor="" className="text-primary font-medium text-lg">
          Date Expired
        </label>
        <DateInputField
          formData={formData}
          name="dateExpired"
          className="w-full h-full"
          onChange={handleChange}
        />
      </div>

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

const ModalUpdatePremiumDates = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog
      open={modalType === "update-premium-dates"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Dates</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdatePremiumDates;
