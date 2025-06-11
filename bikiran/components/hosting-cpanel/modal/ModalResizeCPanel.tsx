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
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { CalculationInputField } from "@bikiran/inputs";
import { useCPanel } from "../context/CPanelProvider";
import { UserInfoComp, CopyWrapper } from "@bikiran/utils";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";

type TPayload = {
  diskSpaceMB: number;
  bandwidthMB: number;
  maxSites: number;
  maxEmailPerHour: number;
};

const ModalContent: FC = () => {
  const [formData, setFormData] = useState<TPayload>({} as TPayload);
  const [loading, setLoading] = useState<boolean>(false);

  const { closeModal, setMessage, modalData } = useTemplate();
  const { put } = useApi();
  const { reload } = useCPanel();

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resizeCPanel = () => {
    setLoading(true);
    put(`/admin/hosting/cp-manage/${modalData?.id}/resize-cpanel`, formData)
      .then((res) => {
        setMessage(res.message);
        closeModal();
        reload();
      })
      .catch((error: Error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-3 ">
      <UserInfoComp
        ImageComponent={Image}
        email={modalData?.user?.email}
        name={modalData?.user?.displayName}
        photoUrl={modalData?.user?.photoUrl}
      />
      <div className="flex flex-col gap-1 text-sm">
        <div className="text-primary-700 grid grid-cols-[80px_auto] gap-8">
          <span>Hostname :</span>
          <CopyWrapper
            className="text-primary"
            content={modalData?.cPanel?.cpHostname}
          />
        </div>
        <div className="text-primary-700 grid grid-cols-[80px_auto] gap-8">
          <span>Domain :</span>
          <CopyWrapper
            className="text-primary"
            content={modalData?.cPanel?.cpDomain}
          />
        </div>
        <div className="text-primary-700 grid grid-cols-[80px_auto] gap-8">
          <span>Username :</span>
          <CopyWrapper
            className="text-primary"
            content={modalData?.cPanel?.cpUsername}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        <div className="space-y-3 mt-3">
          <CalculationInputField
            formData={formData}
            label={"Disk"}
            name="diskSpaceMB"
            onChange={handleChange}
            calculate={false}
            unit={formData.diskSpaceMB > 0 ? "M" : ""}
          />
          <CalculationInputField
            formData={formData}
            label={"Bandwidth"}
            name="bandwidthMB"
            onChange={handleChange}
            calculate={false}
            unit={formData.bandwidthMB > 0 ? "M" : ""}
          />
        </div>
        <div className="space-y-3 mt-3">
          <CalculationInputField
            formData={formData}
            label={"Max Email Per Hour"}
            name="maxEmailPerHour"
            onChange={handleChange}
            calculate={false}
            unit={formData.maxEmailPerHour > 0 ? "/hour" : ""}
          />
          <CalculationInputField
            formData={formData}
            label={"Max Sites"}
            name="maxSites"
            onChange={handleChange}
            calculate={false}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2.5 !mt-5">
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
          onClick={resizeCPanel}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalResizeCPanel = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "cp-resize"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="!w-[400px]">
        <DialogHeader>
          <DialogTitle>Resize CPanel</DialogTitle>
          <DialogDescription className="uppercase group flex gap-1">
            Hosting Id : <CopyWrapper content={modalData?.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalResizeCPanel;
