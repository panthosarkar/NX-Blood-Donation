import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { TDebitCredit } from "../../../billing-account/AccountAdmTypes";
import { TUser } from "../../../hosting-list/hostingListType";
import { TInvoiceInfo } from "@/bik-lib/types/invoice";
import { AnimatedTextArea } from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import { useInvoiceInfo } from "../../context/InvoiceManageProvider";
import UserInformationColumn from "./UserInformationColumnComp";
import useApi from "@/bik-lib/utils/useApi";

type TProps = {
  closeModal: () => void;
  modalData: {
    userinfo: TUser;
    invoice: TInvoiceInfo;
  };
  setMessage: (message: string) => void;
};

const initialValue: TDebitCredit = {
  user: {
    id: 0,
    displayName: "",
    email: "",
    phone: "",
    photoUrl: "",
    status: "",
    userProfile: "",
    primaryIds: [],
    primaryProjectId: 0,
  },
  fac: {
    facId: 0,
    facType: "",
    credit: 0,
    debit: 0,
    balance: 0,
    currency: "",
  },
};

const ModalContent: FC<TProps> = ({ closeModal, modalData, setMessage }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userFetching, setUserFetching] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    amount: number;
    note: string;
  }>({
    amount: 0,
    note: "",
  });

  const [data, setData] = useState<{
    creditSide: TDebitCredit;
    debitSide: TDebitCredit;
  }>({
    creditSide: initialValue,
    debitSide: initialValue,
  });

  const { get, put } = useApi();
  const { reload } = useInvoiceInfo();

  useEffect(() => {
    setUserFetching(true);
    get(
      `/admin/billing/account/${modalData?.invoice?.billingId}/debit-note-account-info`
    )
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUserFetching(false);
      });
  }, []);

  const creditSide = data.creditSide;
  const debitSide = data.debitSide;

  const handleOnChange = (e: TInputChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const operatorNewBalance =
    Number(creditSide.fac.balance) + Number(formData.amount);

  const userNewBalance =
    Number(debitSide.fac.balance) - Number(formData.amount);

  const handleSubmit = () => {
    const payload = {
      invoiceId: modalData.invoice.id,
      debitAccountId: debitSide.fac.facId,
      creditAccountId: creditSide.fac.facId,
      currency: debitSide.fac.currency,
      amount: formData.amount,
      note: formData.note,
    };
    setLoading(true);
    put(
      `/admin/invoice-payment/${modalData?.invoice?.id}/invoice-debit-note`,
      payload
    )
      .then(({ message }) => {
        closeModal();
        reload();
        if (message) {
          setMessage(message);
        }
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
      <div className="flex item-center gap-[6px]">
        <UserInformationColumn
          type="debit"
          data={debitSide}
          newBalance={userNewBalance}
          loading={userFetching}
          formData={formData}
          onChange={handleOnChange}
          className="pr-3"
        />

        <div className="h-auto w-1 bg-primary-100"> </div>
        <UserInformationColumn
          type="credit"
          data={creditSide}
          newBalance={operatorNewBalance}
          loading={userFetching}
          formData={formData}
          onChange={handleOnChange}
          className="pl-3"
        />
      </div>
      <div className="w-full flex justify-start gap-[76px]">
        <div className="text-primary-700 text-sm font-medium">
          Note<span className="text-error">*</span>
        </div>
        <AnimatedTextArea
          formData={formData}
          label="Please Write a Reason"
          name="note"
          onChange={handleOnChange}
          className="!h-18 !w-[491px]"
        />
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
          variant="secondary"
          className="w-24 h-10"
          loading={loading}
          onClick={handleSubmit}
          disabled={userFetching}
        >
          Transfer
        </Button>
      </div>
    </div>
  );
};

const ModalInvoiceDebitNote = () => {
  const { closeModal, modalType, modalData, setMessage } = useTemplate();
  return (
    <Dialog open={modalType === "remove-fund"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="!max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Debit Note</DialogTitle>
        </DialogHeader>
        <DialogBody className="w-auto  min-h-1">
          <ModalContent
            closeModal={closeModal}
            modalData={modalData}
            setMessage={setMessage}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInvoiceDebitNote;
