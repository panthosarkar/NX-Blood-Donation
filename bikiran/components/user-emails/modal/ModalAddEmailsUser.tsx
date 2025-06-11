/* eslint-disable no-unused-vars */
import { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { useUserEmailsList } from "../context/UserEmailsListProvider";
import { EmailInputField } from "@bikiran/inputs";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import useApi from "@/bik-lib/utils/useApi";
import { error } from "console";
import { Button } from "@bikiran/button";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [formData, setFormData] = useState<any>({
    user: "",
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const [userData, setUserData] = useState<any[]>([]);

  const { post } = useApi();
  const { reload } = useUserEmailsList();
  const { setMessage } = useTemplate();

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  //Create emails user
  const addHostingUser = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    const userId = selectedUser?.id;
    post(`/admin/user/email/${userId}/add`, { email: formData?.email })
      .then(({ message }) => {
        setMessage(message);
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
    <form onSubmit={addHostingUser} className="flex flex-col gap-4 mt-3">
      <UserSearchComp
        formData={formData}
        setFormData={setFormData}
        setUserData={setUserData}
        userData={userData}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <EmailInputField
        formData={formData}
        name="email"
        label="Email"
        type="email"
        onChange={handleChange}
      />

      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          className="w-[100px] h-10"
          onClick={closeModal}
        />
        <Button
          variant="secondary"
          title="Create"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalAddEmailsUser: FC = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "add-emails"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Add Email</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1 overflow-visible">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddEmailsUser;
