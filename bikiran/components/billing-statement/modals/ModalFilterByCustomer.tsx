import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/bikiran/components/ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import { Button } from "@bikiran/button";
import { useStatementInfo } from "../context/StatementProvider";

type TChangeOwnerPayload = {
  user: string;
};
const defaultFormData: TChangeOwnerPayload = {
  user: "",
};
const ModalContent: FC = () => {
  const [formData, setFormData] = useState({ ...defaultFormData });
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any[]>([]);

  const { setMessage, closeModal } = useTemplate();
  const { authInfo, chkLoginReq } = useAuth2();
  const [selectedUser, setSelectedUser] = useState<TUser>();

  const { reload } = useStatementInfo();

  const handleFilterUser = () => {
    setLoading(true);
    const payload = {
      user: selectedUser ? selectedUser.id : 0,
    };
    // ApiFilterCustomar(authInfo, chkLoginReq, payload)
    //   .then((data) => {
    //     closeModal();
    //     reload();
    //   })
    //   .catch((err: Error) => {
    //     console.log(err.message);
    //     setMessage(err.message);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <form onSubmit={handleFilterUser}>
      <div className="space-y-3.5 mb-5">
        <UserSearchComp
          formData={formData}
          selectedUser={selectedUser}
          setFormData={setFormData}
          setSelectedUser={setSelectedUser}
          setUserData={setUserData}
          userData={userData}
        />
      </div>
      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          disabled={loading}
          onClick={closeModal}
          className="w-30 h-10"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          loading={loading}
          className="w-30 h-10"
        >
          Search
        </Button>
      </div>
    </form>
  );
};
const ModalFilterByCustomer: FC = () => {
  const { modalType, closeModal } = useTemplate();
  return (
    <Dialog open={modalType === "filter-by-customer"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Filter by Customer</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFilterByCustomer;
