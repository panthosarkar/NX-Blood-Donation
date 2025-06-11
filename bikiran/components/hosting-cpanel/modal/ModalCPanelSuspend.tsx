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
import { AnimatedTextArea } from "@bikiran/inputs";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useCPanel } from "../context/CPanelProvider";
import Image from "next/image";
import { UserInfoComp, CopyWrapper } from "@bikiran/utils";
import { cn } from "@/bik-lib/utils/cn";
import iconAlert from "@/public/assets/images/icons/icon-triangle-alert.svg";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent: FC = () => {
  const [formData, setFormData] = useState<{ note: string }>({ note: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const { put } = useApi();
  const { closeModal, setMessage, modalData } = useTemplate();
  const { reload } = useCPanel();

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const suspendCPanel = () => {
    setLoading(true);
    put(`/admin/hosting/cp-manage/${modalData?.id}/cpanel-suspend`, formData)
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
    <div className="space-y-3">
      <div className="flex items-center px-5 py-4 gap-4 bg-[#FFFDF6] border border-[#FFD99F] rounded-10">
        <Image
          src={iconAlert}
          alt=""
          width={100}
          height={100}
          sizes="100vw"
          className="size-10"
        />
        <div className="text-sm text-nowrap">
          Are you sure, you want to
          <span className={cn("font-medium")}>
            <span className="text-error">&nbsp;Suspend&nbsp;</span>
          </span>
          <br />
          this cPanel?
        </div>
      </div>
      <UserInfoComp
        ImageComponent={Image}
        email={modalData?.user?.email}
        name={modalData?.user?.displayName}
        photoUrl={modalData?.user?.photoUrl}
      />
      <div className="flex flex-col gap-1 text-sm">
        <div className="text-primary-700 grid grid-cols-[100px_auto] gap-1">
          <span>Hostname :</span>
          <CopyWrapper
            className="text-primary"
            content={modalData?.cPanel?.cpHostname}
          />
        </div>
        <div className="text-primary-700 grid grid-cols-[100px_auto] gap-1">
          <span>Domain :</span>
          <CopyWrapper
            className="text-primary"
            content={modalData?.cPanel?.cpDomain}
          />
        </div>
        <div className="text-primary-700 grid grid-cols-[100px_auto] gap-1">
          <span>Username :</span>
          <CopyWrapper
            className="text-primary"
            content={modalData?.cPanel?.cpUsername}
          />
        </div>
      </div>
      <AnimatedTextArea
        formData={formData}
        label="Note"
        name="note"
        className="h-28 !mt-3"
        onChange={handleChange}
      />

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
          variant="red"
          className="w-24 h-10"
          loading={loading} // if you have loading state
          onClick={suspendCPanel}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

const ModalCPanelSuspend = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "cPanel-suspend"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="!w-[400px]">
        <DialogHeader>
          <DialogTitle>Suspend CPanel</DialogTitle>
          <DialogDescription className="uppercase group flex gap-1">
            Hosting Id : <CopyWrapper content={modalData?.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCPanelSuspend;
