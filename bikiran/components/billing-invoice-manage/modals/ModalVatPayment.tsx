import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { cn } from "@/bik-lib/utils/cn";
import { icons } from "@/bikiran/lib/icons";
import { Button } from "@bikiran/button";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import { UserInfoComp } from "@bikiran/utils";
import { useInvoiceInfo } from "../context/InvoiceManageProvider";
import { AnimatedTextArea } from "@bikiran/inputs";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";

type TPayment = {
  amount: number;
  payForce: boolean;
  note: string;
  payBy: string;
};

const paymentOptions = [
  { value: "bikiran", label: "Processed by bikiran" },
  { value: "customer", label: "Processed by customer" },
];

const ModalContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    payAmount: number;
    payBy: string;
    note: string;
  }>({
    payAmount: 0,
    payBy: "bikiran",
    note: "",
  });

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { closeModal, setMessage } = useTemplate();
  const { invoiceInfo, reload } = useInvoiceInfo();
  const { invoice, customerFac } = invoiceInfo;
  const { put } = useApi();

  const user = { ...invoiceInfo.addressBilling, balance: 0 };

  const isDisabled = false;

  const handleAddPayment = async () => {
    const payload: TPayment = {
      amount: invoice.totalVat,
      payForce: true,
      note: formData.note,
      payBy: formData.payBy,
    };

    setMessage("Adding payment....");
    setLoading(true);
    try {
      const { message } = await put(
        `/admin/invoice-payment/${invoice?.id?.toString()}/vat-payment`,
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="mb-4">
          <UserInfoComp
            photoUrl={icons.iconUser}
            name={user?.name}
            email={user?.email}
            ImageComponent={Image}
          />
        </div>
        <div className="text-sm">
          <span className="font-semibold">Balance:&nbsp;</span>
          <span className="text-secondary font-medium">
            {showCurrencySign(invoice?.localCurrency)}&nbsp;
            {showInt(customerFac?.balance)}
          </span>
        </div>
      </div>

      <RadioGroup
        defaultValue="bikiran"
        onValueChange={(v) => setFormData((prev) => ({ ...prev, payBy: v }))}
      >
        {paymentOptions.map(({ value, label }) => (
          <div
            key={value}
            className={cn(
              "flex items-center rounded-8 h-10 px-2 -ml-2 cursor-pointer",
              { "bg-[rgba(245,0,87,.05)]": formData.payBy === value }
            )}
          >
            <RadioGroupItem
              value={value}
              id={value}
              className="border-[#f50057] text-[#f50057] size-5"
            />
            <label
              htmlFor={value}
              className="w-full cursor-pointer flex items-center h-full pl-2"
            >
              {label}
            </label>

            {formData.payBy === value && (
              <span className="text-secondary text-sm">
                {showInt(invoice.totalVat)}
              </span>
            )}
          </div>
        ))}
      </RadioGroup>

      <AnimatedTextArea
        formData={formData}
        name="note"
        label="Note"
        className="h-[115px] mt-5"
        onChange={handleOnChange}
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

const ModalVatPayment = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "vat-payment"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Vat Payment</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalVatPayment;
