/* eslint-disable no-unused-vars */
"use client";
import UserAvatar from "@/bik-lib/features/user-avatar/UserAvatar";
import { FC } from "react";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { TAuthInfo, TAuthUser } from "@/bik-lib/context/auth/authTypes";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { InputField } from "@bikiran/inputs";
import { Button } from "@bikiran/button";

type Props = {
  saveClick: () => void;
  closeModal?: () => void;
  loading: boolean;
  onChange: (ev: TInputChangeEvent) => void;
  formData: any;
  authInfo: TAuthInfo;
};

const ProfileInfoText: FC<{ userInfo: TAuthUser }> = ({ userInfo }) => {
  return (
    <div className="flex flex-col">
      <div className="full-name text-primary text-xl font-medium">
        {userInfo.name}
      </div>
      <div className="full-name text-primary-700 text-base font-normal">
        {userInfo.email}
      </div>
    </div>
  );
};

const ModalContent: FC<Props> = ({
  saveClick,
  closeModal,
  onChange,
  formData,
  loading,
  authInfo,
}) => {
  const onSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    saveClick();
  };

  return (
    <div>
      <div className="pb-2 mb-2">
        <div className="flex items-center gap-[14px]">
          <div className="size-16.5 overflow-hidden">
            <UserAvatar authInfo={authInfo} />
          </div>
          <ProfileInfoText userInfo={authInfo.currentUser} />
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          label="Password"
          type="password"
          name="password"
          formData={formData}
          onChange={onChange}
          placeholder={`Enter Password...`}
        />

        <div className="flex justify-end gap-2 h-9">
          <Button
            variant="gray"
            type="button"
            className=" h-10 w-20 "
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            className=" h-10 w-20 "
            type="submit"
            loading={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

const ModalPasswordVerify: FC<Props & { show: boolean }> = ({
  show,
  saveClick,
  onChange,
  formData,
  loading,
  authInfo,
}) => {
  const { closeModal } = useTemplate();
  // const handleSubmit = (ev: TFormEvent) => {
  //   ev.stopPropagation();
  //   ev.preventDefault();
  //   setLoading(true);
  //   ApiUpdateUsernameInfo(authInfo, formData)
  //     .then(({ message }) => {
  //       // set success message
  //       setMessage(message);

  //       closeModal();
  //       // refetch the auth info
  //       refetchAuth();
  //       // reset the form data
  //       setFormData(initialState);
  //     })
  //     .catch((err: Error) => {
  //       setMessage(err?.toString());
  //     })
  //     .finally(() => {
  //       // stop loading after success or error
  //       setLoading(false);
  //     });
  // };

  if (!show) return null;
  return (
    <Dialog open={show} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Enter Password to continue</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-56">
          <ModalContent
            saveClick={saveClick}
            closeModal={closeModal}
            onChange={onChange}
            formData={formData}
            loading={loading}
            authInfo={authInfo}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPasswordVerify;
