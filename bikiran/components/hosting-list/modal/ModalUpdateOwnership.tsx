import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useHostingList } from "../context/HostingListProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { icons } from "@/bikiran/lib/icons";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import useApi from "@/bik-lib/utils/useApi";
import { Button } from "@bikiran/button";

type TChangeOwnerPayload = {
  user: string;
};
const defaultFormData: TChangeOwnerPayload = {
  user: "",
};
const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
  });
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TUser>();

  const { put } = useApi();
  const { reload } = useHostingList();
  const { modalData, setMessage } = useTemplate();

  const changeOwner = () => {
    setLoading(true);
    setMessage("Changing Owner...");
    put(`/admin/hosting/manage/${modalData.id}/change-ownership`, {
      newUserId: selectedUser?.id || 0,
    })
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err: Error) => {
        setMessage(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-[14px] py-3 px-3 w-full">
        <div className="size-9 overflow-hidden">
          <Avatar className="relative !size-full mb-3 group">
            <AvatarImage src={modalData?.user?.photoUrl || icons.iconBikLogo} />
            <AvatarFallback className="uppercase bg-secondary-300">
              X
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <div className="full-name text-primary text-base font-medium">
            {modalData?.user?.displayName}
          </div>
          <div className="full-name text-primary-700 text-sm font-normal">
            {modalData?.user?.email}
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold text-primary flex justify-center items-center">
        ↓
      </div>
      <UserSearchComp
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        formData={formData}
        setFormData={setFormData}
        setUserData={setUserData}
        userData={userData}
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
          onClick={changeOwner}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalUpdateOwnership: FC = () => {
  const { closeModal, modalType, modalData } = useTemplate();

  return (
    <Dialog open={modalType === "update-ownership"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Change Hosting Ownership</DialogTitle>
          <span className=" modal-subtitle">{modalData?.title}</span>
        </DialogHeader>
        <DialogBody className="!min-h-1 overflow-visible">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
export default ModalUpdateOwnership;
