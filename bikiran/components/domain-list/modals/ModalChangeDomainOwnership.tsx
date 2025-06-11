import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "../../ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { icons } from "@/bikiran/lib/icons";
import { useDomainList } from "../context/DomainListProvider";
import { TDomainListItem } from "../domainListTypes";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import useApi from "@/bik-lib/utils/useApi";
import { TApiResponse } from "@/bik-lib/types/response";
import { Button } from "@bikiran/button";

type TProps = {
  closeModal: () => void;
  modalData: TDomainListItem;
  setMessage: (message: string) => void;
};
type TChangeOwnerPayload = {
  user: string;
};

const defaultFormData: TChangeOwnerPayload = {
  user: "",
};

const ModalContent: FC<TProps> = ({ closeModal, setMessage, modalData }) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const [userData, setUserData] = useState<any[]>([]);
  const { put } = useApi();

  const { reload } = useDomainList();

  const handleChangeOwner = () => {
    setMessage("Changing Ownership...");
    setLoading(true);
    const payload = {
      newUserId: selectedUser?.id || 0,
    };
    put<TApiResponse<null>>(
      `/admin/domain/manage/${modalData.id.toString()}/change-ownership`,
      payload
    )
      .then((data) => {
        console.log(data);
        setMessage("Ownership Changed successfully");
        closeModal();
        reload();
      })
      .catch((err: Error) => {
        setMessage(err.message);
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
          onClick={handleChangeOwner}
        >
          Update
        </Button>
      </div>
    </div>
  );
};
const ModalChangeDomainOwnerShip: FC = () => {
  const { closeModal, modalType, setMessage, modalData } = useTemplate();
  return (
    <Dialog
      open={modalType === "domain-change-owner"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Change Ownership</DialogTitle>
          <span className=" modal-subtitle">{modalData?.domainName}</span>
        </DialogHeader>
        <DialogBody className="!min-h-1 overflow-visible">
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

export default ModalChangeDomainOwnerShip;
