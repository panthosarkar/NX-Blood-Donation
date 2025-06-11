import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "@bikiran/button";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import { useInvoiceInfo } from "../context/InvoiceManageProvider";
import { AnimatedTextArea } from "@bikiran/inputs";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import useApi from "@/bik-lib/utils/useApi";

const ModalBody: FC = () => {
  const [formData, setFormData] = useState<{
    note: string;
  }>({ note: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const { setMessage, closeModal } = useTemplate();

  const { invoiceInfo, reload } = useInvoiceInfo();
  const { invoice } = invoiceInfo;
  const { put } = useApi();

  const invoiceId = invoice?.id?.toString();
  const handleSubmit = (ev: TFormEvent) => {
    setLoading(true);
    ev.preventDefault();
    setMessage("reopening...");
    put(`/admin/invoice/${invoiceId}/re-open`, { invoiceId })
      .then(({ message }) => {
        setMessage(message);
        reload();
        closeModal();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;

    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex justify-center items-center mt-10">
        <svg
          width="60"
          height="60"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24.5" cy="24.5" r="24" stroke="#FFA41D" />
          <path
            d="M26.9659 18.275H26.9676L25.5534 27.7142H25.5516C25.4673 28.3578 25.2351 28.846 24.4998 28.846C23.7645 28.846 23.5324 28.3578 23.448 27.7142H23.4462L22.0321 18.275H22.0337C22.0123 18.1109 22 17.9421 22 17.7692C22 16.2398 22.8414 15 24.5 15C26.1584 15 27 16.2398 27 17.7692C26.9996 17.9423 26.9874 18.1109 26.9659 18.275ZM24.4996 30.6923C23.2097 30.6923 22.5552 31.6565 22.5552 32.8462C22.5552 34.0358 23.2097 35 24.4996 35C25.7896 35 26.4441 34.0358 26.4441 32.8462C26.4441 31.6565 25.7896 30.6923 24.4996 30.6923Z"
            fill="#FFA41D"
          />
        </svg>
      </div>
      <div className="w-full flex items-center justify-center">
        Are you sure, you want to
        <span className="text-success">&nbsp;reopen&nbsp;</span>
        this invoice?
      </div>

      <AnimatedTextArea
        formData={formData}
        name="note"
        label="Note"
        className="h-[115px] "
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
          title="Reopen"
          className="px-3 py-2"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalInvoiceReopen: FC = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog open={modalType === "invoice-reopen"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader className="hidden">
          <DialogTitle>Reopen</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1 ">
          <ModalBody />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInvoiceReopen;
