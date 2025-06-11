import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useInvoiceInfo } from "../context/InvoiceManageProvider";
import { CalculationInputField } from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import { UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { cn } from "@/bik-lib/utils/cn";

import useApi from "@/bik-lib/utils/useApi";
import { round } from "@/bik-lib/utils/math";
import { showInt } from "@/bik-lib/utils/show";

type TProps = {
  closeModal: () => void;
};
type TPayment = {
  amount: number;
  payForce: boolean;
};
const refundOptions = [
  { value: "principal", label: "Principal Amount" },
  { value: "vat", label: "VAT Amount" },
];

const ModalContent: FC<TProps> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    type: string;
    amount: number;
    vat: number;
  }>({
    amount: 0,
    type: "",
    vat: 0,
  });

  const { invoiceInfo, reload } = useInvoiceInfo();
  const { setMessage } = useTemplate();

  const { invoiceCalc, addressBilling, invoice } = invoiceInfo;

  const { put } = useApi();

  console.log(invoice.totalVat, "paid");
  console.log(invoice.totalPriceOffer, "totalPriceOffer");

  useEffect(() => {
    if (formData.type === "vat") {
      setFormData((prev) => ({
        ...prev,
        vat: invoiceCalc?.totalVatPaid,
      }));
    } else if (formData.type === "principal") {
      setFormData((prev) => ({
        ...prev,
        amount: invoiceCalc?.totalPrincipalPaid,
      }));
    }
  }, [formData.type]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const invoiceId = invoice.id;

  const payload: TPayment = {
    amount: formData.amount,
    payForce: true,
  };
  const handleRefundPayment = () => {
    setLoading(true);
    setMessage("Refund payment...");
    put(`/admin/invoice-payment/${invoiceId}/refund-payment`, payload)
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
  const handleVatRefundPayment = () => {
    setLoading(true);
    setMessage("Refund payment...");
    put(`/admin/invoice-payment/${invoiceId}/refund-vat-payment`, { invoiceId })
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
    <div className="space-y-4">
      <UserInfoComp
        ImageComponent={Image}
        email={addressBilling.email}
        name={addressBilling.name}
        photoUrl={icons.iconUser}
      />
      <div className="flex justify-between items-center">
        <div className="text-primary-700 ">Balance</div>
        <div className="font-medium">
          {invoice.localCurrency} : {showInt(invoiceInfo?.customerFac?.balance)}
        </div>
      </div>

      <RadioGroup
        onValueChange={(value) => {
          setFormData((prev) => ({
            ...prev,
            type: value,
          }));
        }}
      >
        {refundOptions.map(({ value, label }) => (
          <div
            key={value}
            className={cn(
              "flex items-center hover:bg-[rgba(245,0,87,.05)] rounded-8 h-10 px-2 -ml-2 cursor-pointer"
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
          </div>
        ))}
      </RadioGroup>
      <div className="flex item-center gap-2">
        {formData.type === "vat" && (
          <CalculationInputField
            calculate
            label="Enter Amount"
            name="vat"
            disabled={formData.type === "vat"}
            placeholder="Enter Amount"
            formData={formData}
            onChange={handleOnChange}
          />
        )}
        {formData.type !== "vat" && (
          <CalculationInputField
            calculate
            label="Enter Amount"
            name="amount"
            placeholder="Enter Amount"
            disabled={!formData.type}
            formData={formData}
            onChange={handleOnChange}
          />
        )}
        <div className="w-[227px] flex-shrink-0 bg-secondary-50 flex items-center text-secondary font-medium px-4 rounded-8">
          {invoice.localCurrency}:&nbsp;
          {formData.type === "vat"
            ? showInt(invoice.totalVat)
            : formData.type === "principal"
              ? showInt(
                  Number(invoiceInfo?.customerFac?.balance) +
                    Number(formData.amount)
                )
              : 0.0}
        </div>
      </div>
      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          // disabled={loading} // if you have loading state
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          onClick={
            formData.type === "vat"
              ? handleVatRefundPayment
              : handleRefundPayment
          }
          loading={loading}
          disabled={loading}
        >
          Refund
        </Button>
      </div>
    </div>
  );
};

const ModalInvoiceRefund = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "invoice-refund"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Refund</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInvoiceRefund;
