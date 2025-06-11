import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogDescription,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { AnimatedInputField, AnimatedSelect } from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import { useBankManagement } from "../context/BankManagementProvider";
import { TAddAccountPayload } from "../bankManagementTypes";
import { addOption } from "@/bik-lib/utils/option";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { CopyWrapper } from "@bikiran/utils";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent: FC = () => {
  const { setMessage, closeModal, modalType, modalData } = useTemplate();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TAddAccountPayload>({
    currency: "",
    bankName: "",
    branch: "",
    routingNumber: "",
    swift: "",
    accountName: "",
    accountNumber: "",
    uniqueName: "",
    ...modalData?.bankInfo,
  });

  const { post, put } = useApi();

  const { reload, currencies } = useBankManagement();

  const handleChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const type = modalType?.replace(":bank-account", "")?.trim();

  const facId = modalData?.id || 0;

  const handleAdd = () => {
    setLoading(true);
    setMessage("Adding account...");
    const operation =
      type === "add"
        ? post(`/admin/config/bank-account/create`, formData)
        : put(`/admin/config/bank-account/${facId}/update`, formData);
    operation
      .then(({ message }) => {
        setMessage(message);
        reload();
        closeModal();
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-5 mt-4">
      <AnimatedInputField
        label="Bank Name"
        name="bankName"
        formData={formData}
        onChange={handleChange}
      />{" "}
      <AnimatedInputField
        label="Account Name"
        name="accountName"
        formData={formData}
        onChange={handleChange}
      />
      <AnimatedInputField
        label="Account Number"
        name="accountNumber"
        formData={formData}
        onChange={handleChange}
      />
      <AnimatedInputField
        label="Routing Number"
        name="routingNumber"
        formData={formData}
        onChange={handleChange}
      />
      <div className="flex gap-5 items-center">
        <AnimatedInputField
          label="Branch"
          name="branch"
          formData={formData}
          onChange={handleChange}
        />
        <AnimatedInputField
          label="Swift"
          name="swift"
          formData={formData}
          onChange={handleChange}
        />
      </div>
      <AnimatedInputField
        label="Unique Name"
        name="uniqueName"
        formData={formData}
        onChange={handleChange}
      />
      <AnimatedSelect
        label=""
        placeholder="Select Currency"
        name="currency"
        formData={formData}
        onChange={handleChange}
        options={currencies.map((c) =>
          addOption(c.currency, c.title, c.currency)
        )}
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
          loading={loading}
          onClick={handleAdd}
        >
          {capitalizeFirstLetter(type)}
        </Button>
      </div>
    </div>
  );
};

const ModalAddBankAccount = () => {
  const { closeModal, modalType, modalData } = useTemplate();

  const show =
    modalType === "add:bank-account" || modalType === "update:bank-account";

  return (
    <Dialog open={show} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {modalData ? " Update" : "Add"} Bank Account
          </DialogTitle>
          <DialogDescription className="flex gap-1 uppercase">
            Bank account id : <CopyWrapper content={modalData?.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="min-h-10">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddBankAccount;
