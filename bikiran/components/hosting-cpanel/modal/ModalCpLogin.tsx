import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { UserInfoComp, CopyWrapper } from "@bikiran/utils";
import Image from "next/image";
import SectionLoadingComp from "../../billing-invoice-manage/SectionLoadingComp";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginUrl, setLoginUrl] = useState<string>("");
  const { put } = useApi();

  const { setMessage, modalData, closeModal } = useTemplate();

  useEffect(() => {
    if (modalData === null) return;
    setLoading(true);
    put(`/admin/hosting/cp-manage/${modalData?.id}/cp-login`, {})
      .then(({ data }) => {
        setLoginUrl(data.url);
      })
      .catch((err) => {
        setMessage(err.message);
        setLoginUrl("");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [modalData]);

  return (
    <div className="space-y-3">
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
      </div>
      <div className="flex items-center justify-center">
        {loading && <h2 className="text-primary font-medium">Creating....</h2>}
        {!loading && loginUrl.length !== 0 && (
          <div className="w-full flex items-center justify-between mt-2">
            <h2 className="text-success text-sm">Session Created</h2>
            <Link href={loginUrl} target="_blank">
              <button
                className="px-4 py-1 rounded-8 bg-[#FF6C2C] text-white"
                onClick={closeModal}
              >
                Login to cPanel
              </button>
            </Link>
          </div>
        )}

        {!loading && loginUrl.length === 0 && (
          <div>Error on creating session!</div>
        )}
      </div>
      {loading && (
        <div className="m-0">
          <SectionLoadingComp />
        </div>
      )}
    </div>
  );
};

const ModalCpLogin: FC = () => {
  const { modalType, closeModal, modalData } = useTemplate();

  return (
    <Dialog
      open={modalType === "cPanel-login" && modalData !== null}
      onOpenChange={closeModal}
    >
      <DialogContent className="modal-container !w-[400px]">
        <DialogHeader>
          <DialogTitle className="font-medium">cPanel Login</DialogTitle>
          <DialogDescription className="uppercase group flex gap-1">
            Hosting Id : <CopyWrapper content={modalData?.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="!min-h-20">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCpLogin;
