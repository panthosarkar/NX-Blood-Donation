import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/bikiran/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ButtonLoading } from "@/bik-lib/lib/button";
import { useInvoiceInfo } from "@/bikiran/components/billing-invoice-manage/context/InvoiceManageProvider";
import { AnimatedTextArea } from "@bikiran/inputs";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const invoiceId = useParams().id || "";
  const router = useRouter();

  const { setMessage, closeModal } = useTemplate();

  const { reload } = useInvoiceInfo();
  const { put } = useApi();

  const handleDelete = () => {
    setMessage("Deleting invoice...");
    setLoading(true);

    put(`/admin/invoice/${invoiceId}/delete`, {
      note: inputValue,
    })
      .then((data) => {
        setMessage(data.message);
        closeModal();

        setTimeout(() => {
          reload();
        }, 100); // time: 100ms
        router.push("/billing/invoice");
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="cart-empty-modal mb-8 relative">
      <div className="mb-3 flex justify-center">
        <svg
          width="49"
          height="49"
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

      <div className="mb-5">
        <div className="text-primary text-base text-center font-normal mb-3">
          Are you sure, you want to delete all existing products to delete this
          invoice?
          <div>
            <AnimatedTextArea
              formData={{
                note: inputValue,
              }}
              onChange={(ev: TInputChangeEvent) =>
                setInputValue(ev?.target?.value)
              }
              name="note"
              label="Add Note"
              placeholder="Add note here..."
              className="mt-2"
              // value={formData.note}
              // onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2.5">
        <button
          type="button"
          className="bg-red-600 text-white text-sm font-normal rounded-[8px] px-4 py-2 min-w-20 relative "
          onClick={handleDelete}
          disabled={loading}
        >
          Yes
          {loading ? (
            <div className="absolute top-0 left-0 size-full text-primary">
              <ButtonLoading />
            </div>
          ) : null}
        </button>

        <button
          type="button"
          className="bg-primary-100 text-primary-500 text-sm font-normal rounded-[8px] px-4 py-2 min-w-20"
          onClick={closeModal}
          disabled={loading}
        >
          No
        </button>
      </div>
    </div>
  );
};

const ModalDeleteInvoice = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "delete-invoice"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete Invoice</DialogTitle>
        </DialogHeader>
        <DialogBody className="min-h-1">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeleteInvoice;
