import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { Button } from "@bikiran/button";
import { useParams } from "next/navigation";
import { useInvoiceInfo } from "@/bikiran/components/billing-invoice-manage/context/InvoiceManageProvider";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ title: string }>({
    title: "",
  });
  const invoiceId = useParams().id || "";

  const { setMessage, closeModal } = useTemplate();

  const handleOnChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({ title: value });
    }
  };
  const { invoiceInfo, reload } = useInvoiceInfo();
  const { invoice } = invoiceInfo;
  const { put } = useApi();

  const handleSave = (ev: TFormEvent) => {
    ev.preventDefault();
    setMessage("Changing ...");
    setLoading(true);

    put(`/admin/invoice/${invoiceId}/update-title`, { title: formData?.title })
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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: invoice?.invoiceTitle,
    }));
  }, []);

  return (
    <form onSubmit={handleSave} className="space-y-4 mt-2">
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="title" className="text-primary font-medium ml-1">
          Invoice title
        </label>
        <div className="border border-primary-300 rounded-8 w-full flex items-stretch justify-start relative">
          <div className="flex items-center rounded-tl-8 rounded-bl-8 bg-primary-100 pl-3.5 text-primary-700 text-sm">
            Invoice-{invoice.id || 0}-
          </div>
          <input
            type="text"
            name="title"
            value={formData?.title}
            onChange={handleOnChange}
            placeholder="Enter title"
            className="flex-1 h-10 rounded-8 pr-3.5 focus:outline-none placeholder:pl-3 text-primary-700 text-sm"
          />
        </div>
      </div>
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
          type="submit"
          variant="secondary"
          className="w-24 h-10"
          loading={loading}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

const ModalUpdateTitle = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "update-title"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Title</DialogTitle>
        </DialogHeader>
        <DialogBody className="min-h-1">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateTitle;
