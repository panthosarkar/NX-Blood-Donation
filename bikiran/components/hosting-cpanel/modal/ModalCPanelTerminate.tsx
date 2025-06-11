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
import { InputFieldPassword } from "@/bik-lib/features/inputFieldPassword/InputFieldPassword";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { AnimatedTextArea } from "@bikiran/inputs";
import { useCPanel } from "../context/CPanelProvider";
import { UserInfoComp, CopyWrapper } from "@bikiran/utils";
import Image from "next/image";
import iconAlert from "@/public/assets/images/icons/icon-triangle-alert.svg";
import { cn } from "@/bik-lib/utils/cn";
import useApi from "@/bik-lib/utils/useApi";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";

const ModalContent: FC = () => {
  const [formData, setFormData] = useState<{
    password: string;
    note: string;
  }>({ password: "", note: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const { put } = useApi();
  const { authInfo } = useAuth2();
  const { closeModal, setMessage, modalData } = useTemplate();
  const { reload } = useCPanel();

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const terminate = () => {
    setLoading(true);
    put(`/admin/hosting/cp-manage/${modalData?.id}/terminate`, formData)
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
            <span className="text-error">&nbsp;Terminate&nbsp;</span>
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
      <InputFieldPassword
        formData={formData}
        ImageComponent={Image}
        userPhoto={authInfo?.currentUser?.photoUrl}
        label=""
        name="password"
        onChange={handleChange}
        passwordType="account"
        placeholder="Enter Admin Password"
      />
      <AnimatedTextArea
        formData={formData}
        label="Note"
        name="note"
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
          onClick={terminate}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

const ModalCPanelTerminate = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "cPanel-terminate"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="!w-[400px]">
        <DialogHeader>
          <DialogTitle>CPanel Terminate</DialogTitle>
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

export default ModalCPanelTerminate;
