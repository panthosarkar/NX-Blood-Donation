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
import { ValidationInputField } from "@bikiran/inputs";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useCPanel } from "../context/CPanelProvider";
import { UserInfoComp, CopyWrapper } from "@bikiran/utils";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent: FC = () => {
  const [formData, setFormData] = useState<{
    domain: string;
    password: string;
  }>({
    domain: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { put } = useApi();
  const { closeModal, modalData, setMessage } = useTemplate();
  const { reload } = useCPanel();

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateDomain = (id: number) => {
    setLoading(true);
    setMessage("Updating Domain...");
    put(`admin/hosting/cp-manage/${id}/update-domain`, formData)
      .then((res) => {
        setMessage(res.message);
        closeModal();
        reload();
      })
      .catch((er: Error) => {
        setMessage(er.message);
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

      <ValidationInputField
        formData={formData}
        label="Domain"
        name="domain"
        onChange={handleChange}
        placeholder="ex: www.bikiran.com"
        className="!mt-3"
      />
      {/* <InputFieldPassword
        formData={formData}
        label=""
        type="password"
        name="password"
        placeholder="Enter Admin password"
        onChange={handleChange}
        passwordType="account"
      /> */}
      <div className="flex justify-end gap-2.5 !mt-5">
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
          onClick={() => updateDomain(modalData?.id)}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalCpUpdateDomain = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "cp-update-domain"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="!w-[400px]">
        <DialogHeader>
          <DialogTitle>Update Domain</DialogTitle>
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

export default ModalCpUpdateDomain;
