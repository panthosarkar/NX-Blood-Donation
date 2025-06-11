import React, { FC, useEffect, useState } from "react";
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
import { createPassword } from "@/bik-lib/features/inputFieldPassword/CreatePassword";
import { useCPanel } from "../context/CPanelProvider";
import Image from "next/image";
import { UserInfoComp, CopyWrapper } from "@bikiran/utils";
import Copy from "@/bik-lib/utils/Copy";
import { icons } from "@/bikiran/lib/icons";
import { cn } from "@/bik-lib/features/dropdown/CustomDropdown";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();
  const { put } = useApi();
  const { reload } = useCPanel();
  const { copy, isCopied } = Copy();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    cpPassword: string;
    credentials: string;
  }>({
    cpPassword: "",
    credentials: `Login: ${modalData?.hostname || "-----"}\nUsername: ${modalData?.username || "-----"}\nPassword: -----`,
  });

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const changePassword = (id: number) => {
    const payload = {
      cpPassword: formData.cpPassword,
    };
    setLoading(true);
    put(`/admin/hosting/cp-manage/${id}/change-password`, payload)
      .then((res) => {
        setMessage(res.message);
        closeModal();
        reload();
      })
      .catch((error: Error) => {
        setMessage(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (formData.cpPassword) {
      setFormData((prev) => ({
        ...prev,
        credentials: `Login: ${modalData?.hostname}\nUsername: ${modalData?.username}\nPassword: ${formData?.cpPassword}`,
      }));
    }
  }, [formData.cpPassword]);

  return (
    <div className="space-y-3">
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
        label="New Password"
        name="cpPassword"
        placeholder="Enter new password"
        onChange={handleChange}
        generatePassword={() =>
          setFormData((prev) => ({ ...prev, cpPassword: createPassword() }))
        }
        passwordType="cp"
        description
      />
      <div className="space-y-2 group">
        <label
          htmlFor=""
          className="text-primary font-medium flex gap-1 items-center "
        >
          Credentials
          <Image
            src={isCopied ? icons.iconTick : icons.iconCopy}
            alt="copy"
            width={100}
            height={100}
            sizes="100vw"
            className="size-4 group-hover:block hidden"
          />
        </label>
        <div>
          <textarea
            value={formData.credentials}
            className={cn(
              "w-full  h-20  text-sm border bg-primary-50 text-primary border-[#d0cfd9] rounded-md p-2 cursor-pointer focus:outline-none hover:border-secondary",
              isCopied ? "border-secondary" : ""
            )}
            onClick={() => copy(formData.credentials)}
            readOnly
          />
        </div>
      </div>
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
          onClick={() => {
            changePassword(modalData?.id);
            copy(formData.credentials);
          }}
        >
          Change
        </Button>
      </div>
    </div>
  );
};

const ModalCPanelChangePassword = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "cp-change-password"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="!w-[400px]">
        <DialogHeader>
          <DialogTitle>Change & Share Password</DialogTitle>
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

export default ModalCPanelChangePassword;
