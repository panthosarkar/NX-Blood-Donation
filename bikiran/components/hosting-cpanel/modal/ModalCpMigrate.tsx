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
import { UserInfoComp, CopyWrapper } from "@bikiran/utils";
import Image from "next/image";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useCPanel } from "../context/CPanelProvider";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedSelect } from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    hostname: string;
  }>({
    hostname: "",
  });

  const { closeModal, modalData, setMessage } = useTemplate();
  const { put } = useApi();
  const { data, reload } = useCPanel();

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateServer = () => {
    setLoading(true);
    setMessage("Migration in Progress...");
    put(`/admin/hosting/cp-manage/${modalData?.id}/migration`, formData)
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
      <AnimatedSelect
        formData={formData}
        label={""}
        name="hostname"
        placeholder="Select Hostname"
        options={data?.filters?.hostname
          ?.filter((i) => i !== modalData?.cPanel?.cpHostname)
          .map((item) => addOption(item, item, item))}
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
          variant="secondary"
          className="w-24 h-10"
          loading={loading} // if you have loading state
          onClick={updateServer}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalCpMigrate = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "cp-migrate"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="!w-[400px]">
        <DialogHeader>
          <DialogTitle>Migrate CPanel</DialogTitle>
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

export default ModalCpMigrate;
