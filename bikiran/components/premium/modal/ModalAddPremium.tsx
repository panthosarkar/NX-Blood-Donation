import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Button } from "@bikiran/button";
import useApi from "@/bik-lib/utils/useApi";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import {
  AnimatedInputField,
  AnimatedTextArea,
  DateInputField,
  InputField,
  AnimatedSelect,
  DurationInput,
} from "@bikiran/inputs";
import { addOption } from "@/bik-lib/utils/option";
import PriceCalculationComp from "@/bikiran/shared/price-calculation-comp/PriceCalculationComp";
import { usePremiumInfo } from "../context/PremiumInfoProvider";
import { round } from "@/bik-lib/utils/math";
import { Checkbox } from "../../ui/checkbox";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    subType: modalData?.subType || "",
    title: modalData?.title || "",
    description: modalData?.description || "",
    contractPrice: round(modalData?.contractPrice) || 0,
    contractPriceOffer: round(modalData?.contractPriceOffer) || 0,
    contractVatPercent: round(modalData?.contractVatPercent) || 0,
    contractDuration: modalData?.contractDuration || "",
    contractUnitName: modalData?.contractUnitName || "",
    contractCurrency: modalData?.contractCurrency || "",
    contractCurrencyRate: modalData?.contractCurrencyRate || "",
  });
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const [userData, setUserData] = useState<any[]>([]);

  const { post } = useApi();
  const { data, reload } = usePremiumInfo();

  useEffect(() => {
    if (formData.contractCurrency === "BDT") {
      setFormData({
        ...formData,
        contractCurrencyRate:
          currencies?.find((item) => item.currency === "BDT")?.rate || 0,
      });
    } else if (formData.contractCurrency === "INR") {
      setFormData({
        ...formData,
        contractCurrencyRate:
          currencies?.find((item) => item.currency === "BDT")?.rate || 0,
      });
    } else if (formData.contractCurrency === "USD") {
      setFormData({
        ...formData,
        contractCurrencyRate: 1,
      });
    }
  }, [formData.contractCurrency]);

  const handleChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const addPremium = () => {
    const payload = {
      userId: selectedUser?.id,
      packageId: 0,
      subType: formData?.subType,
      title: formData?.title,
      description: formData?.description,
      contractPrice: formData?.contractPrice,
      contractPriceOffer: formData?.contractPriceOffer,
      contractVatPercent: formData?.contractVatPercent,
      contractDuration: formData?.contractDuration,
      contractUnitName: formData?.contractUnitName,
      identityName: formData?.identityName,
      contractCurrency: formData?.contractCurrency,
      contractCurrencyRate: formData?.contractCurrencyRate,
      dateStarted: formData?.dateStarted,
    };
    setLoading(true);
    post(`/admin/premium-contract/add`, payload)
      .then((res) => {
        setMessage(res.message);
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
  const subtypes = data?.filters?.subtypes;
  const currencies = data?.filters?.currencies;
  const unitNames: string[] = data?.filters?.unitNames;

  return (
    <div className="space-y-3.5">
      <UserSearchComp
        formData={formData}
        selectedUser={selectedUser}
        setFormData={setFormData}
        setSelectedUser={setSelectedUser}
        setUserData={setUserData}
        userData={userData}
      />
      <AnimatedInputField
        formData={formData}
        label="Title"
        name="title"
        onChange={handleChange}
      />
      <AnimatedTextArea
        formData={formData}
        label="Description"
        name="description"
        onChange={handleChange}
      />
      <AnimatedInputField
        formData={formData}
        label="Identity Name"
        placeholder="ex : example@email.com or www.bikiran.com"
        name="identityName"
        onChange={handleChange}
      />
      <div className="">
        {/* <Select
          label=""
          name="packageId"
          placeholder="Select Package"
          options={[]}
          className="pointer-events-none bg-primary-50"
          formData={formData}
          onChange={handleChange}
        /> */}
        <AnimatedSelect
          label=""
          name="subType"
          placeholder="Select Subtype"
          options={
            subtypes?.map((item) =>
              addOption(item.key, item.title, item.key)
            ) || []
          }
          className="overflow-hidden [&>.value]:line-clamp-1 "
          formData={formData}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <AnimatedSelect
            label=""
            name="contractCurrency"
            placeholder="Select Currency"
            options={
              currencies?.map(({ currency }) =>
                addOption(currency, currency, currency)
              ) || []
            }
            containerClassname="mt-1"
            formData={formData}
            onChange={handleChange}
          />
          <InputField
            label=""
            placeholder="Current Rate"
            name="contractCurrencyRate"
            formData={formData}
            onChange={handleChange}
            disabled={formData.contractCurrency === "USD"}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 items-center gap-2">
        <DurationInput
          formData={formData}
          durationName="contractDuration"
          unitName="contractUnitName"
          onChange={handleChange}
          options={unitNames?.map((i) => addOption(i, i, i)) || []}
        />
        <DateInputField
          formData={formData}
          name="dateStarted"
          onChange={handleChange}
          className="h-[45px]"
        />
      </div>
      <div>
        <PriceCalculationComp
          formData={formData}
          handleOnChange={handleChange}
          currency={formData.contractCurrency || "_"}
          unit={`${formData?.contractDuration || "_"} ${formData?.contractUnitName || "_"}`}
        />
        {/* <div className="flex items-center gap-2">
          <Checkbox
            className="border-primary-500 ring-0 data-[state=checked]:border-secondary  data-[state=checked]:bg-secondary data-[state=checked]:text-white disabled:bg-primary-200 disabled:border-primary-500"
            onClick={() => setCheckbox(!checkbox)}
            checked={checkbox}
          />
          <span className="text-xs text-primary-500">
            Add VAT To this product
          </span>
        </div> */}
      </div>

      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          disabled={loading} // if you have loading state
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          loading={loading} // if you have loading state
          onClick={addPremium}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

const ModalAddPremium = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "add-premium"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>
            {modalData ? "Duplicate" : "Add"} Premium Subscription
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1 ">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddPremium;
