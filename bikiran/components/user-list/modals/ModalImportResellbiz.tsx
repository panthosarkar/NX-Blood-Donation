import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useUserList } from "../context/UserListProvider";
import { Button } from "@bikiran/button";
import { cn } from "@/bik-lib/utils/cn";
import { AnimatedInputField } from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";

type TProps = {
  closeModal: () => void;
  setMessage: any;
};

const Container: FC<{
  show: boolean;
  children: ReactNode;
}> = ({ show, children }) => {
  return (
    <div
      className={cn("overflow-hidden transition-all", {
        "max-h-32": show,
        "max-h-0": !show,
      })}
    >
      {children}
    </div>
  );
};

const ModalContentDataComp: FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <div className=" flex">
        <div className="w-30">Email:</div>
        <span className=" text-primary-700">{data?.email}</span>
      </div>
      <div className=" flex">
        <div className="w-30">Name:</div>
        <span className=" text-primary-700">{data?.name}</span>
      </div>
      <div className=" flex">
        <div className="w-30">Organization:</div>
        <span className=" text-primary-700">{data?.organization}</span>
      </div>
      <div className=" flex">
        <div className="w-30">Phone:</div>
        <span className=" text-primary-700">{data?.phone}</span>
      </div>
    </div>
  );
};
const ModalContent: FC<TProps> = ({ closeModal, setMessage }) => {
  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [importSuccess, setImportSuccess] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [payloadValue, setPayloadValue] = useState<string>("");

  const { get, post } = useApi();
  const { reload } = useUserList();

  const handleOnChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImportUser = (ev: TInputChangeEvent) => {
    const { value } = ev.target;

    if (formData?.email?.length !== 0 && value !== payloadValue) {
      setMessage("Find user...");
      setLoading(true);
      get(`/admin/user/import-from-resellbiz/find`, formData)
        .then(({ data, message }) => {
          setMessage(message);
          setData(data);
          setImportSuccess(true);
        })
        .catch((err: Error) => {
          setMessage(err.message);
          setImportSuccess(false);
          setErrMessage(err.message);
        })
        .finally(() => {
          setPayloadValue(value);
          setLoading(false);
        });
    }
  };

  const handleAddUser = (ev: TFormEvent) => {
    ev.preventDefault();
    setMessage("Creating user...");
    setLoading(true);
    post(`/admin/user/import-from-resellbiz/add-user`, formData)
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

  useEffect(() => {
    if (formData?.email?.length === 0) {
      setErrMessage("");
    }
  }, [formData?.email]);

  return (
    <form className="pt-4" onSubmit={handleAddUser}>
      <AnimatedInputField
        label="Email"
        name="email"
        formData={formData}
        onChange={handleOnChange}
        onBlur={handleImportUser}
        className=" focus:bg-primary-300 mb-2.5"
      />

      <Container show={importSuccess}>
        <div className=" text-sm ">
          <ModalContentDataComp data={data} />
        </div>
      </Container>

      <Container show={errMessage?.length !== 0}>
        <div className="text-red-500 text-sm">{errMessage}</div>
      </Container>

      <div className="flex justify-end gap-2.5 mt-2.5">
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
          disabled={!importSuccess}
        >
          Add
        </Button>
      </div>
    </form>
  );
};

const ModalImportResellbiz: FC = () => {
  const { modalType, closeModal, setMessage } = useTemplate();

  return (
    <Dialog open={modalType === "from-resellbiz"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Import From Resellbiz</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalContent setMessage={setMessage} closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalImportResellbiz;
