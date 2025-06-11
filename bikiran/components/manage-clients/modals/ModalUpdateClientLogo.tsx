import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { FC, useRef, useState } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import Image from "next/image";
import { ApiUploadClientLogo } from "../ClientInfoOperations";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { icons } from "@/bikiran/lib/icons";
import { useClientInfo } from "../context/ClientInfoProvider";
import { LoadingComp } from "@bikiran/utils";

type TProps = {
  modalData: any;
  setMessage: (message: string) => void;
  closeModal: () => void;
};

type TActionProps = {
  modalData: any;
  setMessage: (message: string) => void;
  closeModal: () => void;
  setFormData: (data: any) => void;
};

const Actions: FC<TActionProps> = ({
  closeModal,
  modalData,
  setMessage,
  setFormData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authInfo, chkLoginReq } = useAuth2();
  const { reFetch } = useClientInfo();

  // upload image
  const handleUploadLogo = (e: any) => {
    const file = e.target.files![0];
    if (file) {
      const fileData = new FormData();
      fileData.append("file", file);
      setLoading(true);
      ApiUploadClientLogo(
        authInfo,
        modalData.id.toString(),
        fileData,
        chkLoginReq
      )
        .then(() => {
          setFormData((prev: any) => {
            return {
              ...prev,
              organizationLogoUrl: URL.createObjectURL(file),
            };
          });
          setMessage("Logo uploaded successfully");
          reFetch();
        })
        .catch((ex) => {
          setMessage(ex.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mt-6 flex justify-between items-center text-primary">
      <button
        className="flex-1 flex flex-col items-center text-primary hover:text-secondary-700"
        onClick={handleFileInputClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="text-sm mt-2">Add photo</span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleUploadLogo}
        hidden
        accept="image/png, image/jpeg, image/jpg"
      />

      {loading && <LoadingComp />}
    </div>
  );
};

const ModalContent: FC<TProps> = ({ closeModal, modalData, setMessage }) => {
  const [formData, setFormData] = useState<any>({
    organizationLogoUrl: modalData?.organizationLogoUrl || "",
  });
  return (
    <div className="text-center relative">
      {/* Circular Profile Image */}
      <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border border-primary-700">
        <Image
          src={formData.organizationLogoUrl || icons.iconDefaultApp}
          alt="avatar"
          width={160}
          height={160}
          priority
          className="size-full object-cover"
        />
      </div>

      {/* Actions */}
      <Actions
        modalData={modalData}
        setMessage={setMessage}
        closeModal={closeModal}
        setFormData={setFormData}
      />
    </div>
  );
};

const ModalUpdateClientLogo: FC = () => {
  const { modalType, closeModal, modalData, setMessage } = useTemplate();
  return (
    <Dialog open={modalType === "update-client-logo"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="border-0">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-40">
          <ModalContent
            modalData={modalData}
            setMessage={setMessage}
            closeModal={closeModal}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateClientLogo;
