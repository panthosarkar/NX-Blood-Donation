/* eslint-disable no-unused-vars */

"use client";
import { FC, useState } from "react";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { addOption } from "@/bik-lib/utils/option";
import countries from "@/bik-lib/utils/country.json";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/bikiran/components/ui/dialog";
import UserDetailsComp from "../../../shared/user-search/UserDetailsComp";
import { TUser } from "../../../shared/user-search/UserSearchType";
import { AnimatedInputField, EmailInputField, Select } from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import { icons } from "@/bikiran/lib/icons";
import { useInvoiceInfo } from "@/bikiran/components/billing-invoice-manage/context/InvoiceManageProvider";
import useApi from "@/bik-lib/utils/useApi";

const ModalBody: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();

  const [formData, setFormData] = useState<any>({
    name: modalData?.addressBilling?.name || "",
    email: modalData?.addressBilling?.email || "",
    organization: modalData?.addressBilling?.organization || "",
    mobile: modalData?.addressBilling?.mobile || "",
    line1: modalData?.addressBilling?.line1 || "",
    line2: modalData?.addressBilling?.line2 || "",
    country: modalData?.addressBilling?.country || "",
    state: modalData?.addressBilling?.state || "",
    city: modalData?.addressBilling?.city || "",
    zipCode: modalData?.addressBilling?.zipCode || "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { put } = useApi();
  const { reload } = useInvoiceInfo();
  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const userData: TUser = {
    displayName: modalData?.addressShipping?.name,
    email: modalData?.addressShipping?.email,
    photoUrl: icons.iconUser,
    id: 0,
    phone: modalData?.addressShipping?.mobile,
  };

  const payload = {
    type: "billing",
    name: formData?.name,
    organization: formData?.organization,
    email: formData?.email,
    mobile: formData?.mobile,
    telephone: formData?.telephone,
    fax: formData?.fax,
    line1: formData?.line1,
    line2: formData?.line2,
    line3: formData?.line3,
    country: formData?.country,
    state: formData?.state,
    city: formData?.city,
    zipCode: formData?.zipCode,
  };

  const handleUpdateAddress = () => {
    setLoading(true);
    put(`/admin/invoice/${modalData?.invoice.id}/update-address`, payload)
      .then(({ message }) => {
        closeModal();
        reload();
        if (message) {
          setMessage(message);
        }
      })
      .catch((er: Error) => {
        setMessage(er.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-6 mt-1">
      <UserDetailsComp data={userData} />
      <div className="grid grid-cols-2 gap-4">
        <AnimatedInputField
          formData={formData}
          name="name"
          label="Name"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          name="organization"
          label="Organization"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <EmailInputField
          formData={formData}
          name="email"
          label="Email"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          name="mobile"
          label="Mobile"
          onChange={handleChange}
        />
      </div>
      <div className="space-y-6">
        <AnimatedInputField
          formData={formData}
          name="line1"
          label="Holding, House, Road"
          onChange={handleChange}
          required
        />
        <AnimatedInputField
          formData={formData}
          name="line2"
          label="Area/Village"
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4 items-end">
        <Select
          formData={formData}
          label={"Country"}
          name="country"
          placeholder="Select Country"
          onChange={handleChange}
          options={countries.map((item) =>
            addOption(item?.name, item?.code, item?.code)
          )}
        />
        <AnimatedInputField
          formData={formData}
          name="state"
          label="State"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <AnimatedInputField
          formData={formData}
          name="city"
          label="City"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          name="zipCode"
          label="Zip Code"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          className="w-[100px] h-10"
          onClick={closeModal}
        />
        <Button
          variant="secondary"
          title="Update"
          className="w-[100px] h-10"
          loading={loading}
          onClick={() => handleUpdateAddress()}
        />
      </div>
    </div>
  );
};

const ModalModifyAddress: FC = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "address-modify"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Modify Address</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalModifyAddress;
