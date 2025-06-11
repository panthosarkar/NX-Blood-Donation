import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { cn } from "@/bik-lib/utils/cn";
import { Button } from "@bikiran/button";
import { showInt } from "@/bik-lib/utils/show";
import { Checkbox } from "../../ui/checkbox";
import { InputField } from "@bikiran/inputs";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import { CopyWrapper, UserInfoComp } from "@bikiran/utils";
import { useInvoiceInfo } from "../context/InvoiceManageProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";

type TPayment = {
  amount: number;
  payForce: boolean;
};

const FinanceAcInformation: FC<{
  accountName: string;
  facId: number;
}> = ({ accountName, facId }) => {
  return (
    <div className="text-xs text-primary [&_span]:text-primary-700 [&_span]:w-[30%] [&_span]:block [&>div]:flex [&>div]:items-center border border-primary-300 rounded-10 px-4 py-2 -ml-3">
      <div>
        <span>Account Name</span>: {accountName}
      </div>
      <div>
        <span>Fac ID</span>:&nbsp; <CopyWrapper content={facId} />
      </div>
    </div>
  );
};

const AgreementComp: FC<{
  show: boolean;
  onClick: () => void;
  checked: boolean;
}> = ({ show, onClick, checked }) => {
  return (
    <div
      className={cn("max-h-0 transition-all overflow-hidden", {
        "max-h-28": show,
      })}
    >
      <div className="flex flex-col items-start border border-red-400 rounded-10 p-2">
        <span className="text-xs text-error">
          Your payment is more than your balance. This will make your balance
          negative. Do you still want to proceed?
        </span>
        <div className="flex items-center gap-1.5 mt-2">
          {/* <input type="checkbox" className="mr-2" id="agree" /> */}
          <Checkbox
            id="agree"
            className={`size-4 border-primary ring-0 data-[state=checked]:border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-white mt-1`}
            onClick={onClick}
            checked={checked}
          />
          <label htmlFor="agree" className="text-secondary text-sm">
            I agree
          </label>
        </div>
      </div>
    </div>
  );
};

const ModalContent: FC = () => {
  const { invoiceInfo, reload } = useInvoiceInfo();
  const { invoice } = invoiceInfo;

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    payAmount: number;
    agree: boolean;
  }>({
    payAmount: parseFloat(invoice.totalDue?.toFixed(4)) || 0,
    agree: false,
  });

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { closeModal, setMessage } = useTemplate();

  const { put } = useApi();

  const user = { ...invoiceInfo.addressBilling, balance: 0 };

  const newBalance = () => {
    if (formData.payAmount > user.balance && formData.agree) {
      return (
        Number(invoiceInfo?.customerFac?.balance) - Number(formData.payAmount)
      );
    }
    return 0;
  };

  const isDisabled =
    formData.payAmount > user.balance ? !formData.agree : false;

  const handleAddPayment = async () => {
    const payload: TPayment = {
      amount: formData?.payAmount,
      payForce: true,
    };

    setMessage("Adding payment....");
    setLoading(true);
    try {
      const { message } = await put(
        `/admin/invoice-payment/${invoice?.id?.toString()}/add-payment`,

        payload
      );
      setMessage(message);
      closeModal();
      reload();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const balance = invoiceInfo?.customerFac?.balance || 0;
  const accountName = invoiceInfo?.customerFac?.title || "";
  const facId = invoiceInfo?.customerFac?.id || 0;

  return (
    <div className="space-y-4">
      <div className="mb-4 space-y-2">
        <FinanceAcInformation accountName={accountName} facId={facId} />
        <div className="py-3">
          <UserInfoComp
            photoUrl={invoiceInfo?.invoiceOwner?.photoUrl}
            name={invoiceInfo?.invoiceOwner?.displayName}
            email={invoiceInfo?.invoiceOwner?.email}
            ImageComponent={Image}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-primary text-base font-medium">Balance</div>
        <div className="font-medium">
          {invoiceInfo.invoice.localCurrency} : {showInt(balance)}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* <span className="text-primary-700">Pay Amount</span> */}
        <div className="w-full flex flex-col items-end ">
          <InputField
            type="number"
            formData={formData}
            name="payAmount"
            label="Pay Amount"
            placeholder="Enter Payment Amount"
            className="!h-10 !text-sm"
            parentClassName="grid grid-cols-2 items-center"
            onChange={handleOnChange}
          />
          <span className="text-secondary text-xs px-2 py-1">
            Maximum amount BDT {showInt(invoice.totalDue)} (No VAT)
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-primary text-base font-medium">New Balance</div>
        <div className="font-medium">
          <span className="">{invoiceInfo.invoice.localCurrency}</span> :{" "}
          {showInt(newBalance())}
        </div>
      </div>

      <AgreementComp
        show={formData.payAmount > user.balance}
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            agree: !prev.agree,
          }))
        }
        checked={formData.agree}
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
          disabled={isDisabled}
          loading={loading}
          onClick={handleAddPayment}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

const ModalAddPayment = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "modal-add-payment"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddPayment;
