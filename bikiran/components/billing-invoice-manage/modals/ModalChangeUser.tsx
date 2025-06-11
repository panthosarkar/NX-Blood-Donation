"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TUser } from "../../../shared/user-search/UserSearchType";
import UserDetailsComp from "../../../shared/user-search/UserDetailsComp";
import UserSearchComp from "../../../shared/user-search/UserSearchComp";
import { Button } from "@bikiran/button";
import { useInvoiceInfo } from "@/bikiran/components/billing-invoice-manage/context/InvoiceManageProvider";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const [userData, setUserData] = useState<any[]>([]);

  const { closeModal, setMessage, modalData } = useTemplate();

  const { invoiceInfo, reload } = useInvoiceInfo();
  const { invoice } = invoiceInfo;
  const { put } = useApi();

  const handleSave = () => {
    setMessage("Changing user ...");
    setLoading(true);

    put(`/admin/invoice/${invoice?.id?.toString()}/change-ownership`, {
      newUserId: selectedUser?.id || 0,
    })
      .then((data) => {
        setMessage(data.message);
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
    <div className="space-y-2">
      <h2 className="text-primary font-medium">Current User</h2>
      <UserDetailsComp data={modalData} />
      <UserSearchComp
        formData={formData}
        setFormData={setFormData}
        setUserData={setUserData}
        userData={userData}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <div className="flex justify-end gap-2.5">
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
          onClick={handleSave}
        >
          Change
        </Button>
      </div>
    </div>
  );
};

const ModalChangeUser = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "change-user"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Change User</DialogTitle>
        </DialogHeader>
        <DialogBody className="min-h-1 overflow-visible">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalChangeUser;
