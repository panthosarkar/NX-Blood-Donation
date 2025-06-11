import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogDescription,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Button } from "@bikiran/button";
import { CopyWrapper } from "@bikiran/utils";
import { InputField } from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useHostingList } from "../context/HostingListProvider";

const ModalContent: FC = () => {
  const { closeModal, modalData, setMessage } = useTemplate();
  const { put } = useApi();
  const { reload } = useHostingList();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    numberOfCP: string;
  }>({
    numberOfCP: modalData?.cpLimit || "",
  });

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    if (!isNaN(Number(value))) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const updateCpLimit = () => {
    setLoading(true);
    put(`/admin/hosting/manage/${modalData?.id}/update-cp-limit`, formData)
      .then((res) => {
        closeModal();
        setMessage(res.message);
        reload();
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-4">
      <InputField
        formData={formData}
        label={"cPanel Limit"}
        name="numberOfCP"
        className=""
        onChange={handleChange}
      />

      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          disabled={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          loading={loading}
          onClick={updateCpLimit}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalCPLimit = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "update-cp-limit"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update cP Limit</DialogTitle>
          <DialogDescription className="uppercase flex gap-1">
            cP Id : <CopyWrapper content={modalData?.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCPLimit;
