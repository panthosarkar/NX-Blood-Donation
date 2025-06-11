import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogDescription,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Button } from "@bikiran/button";
import useApi from "@/bik-lib/utils/useApi";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { InputField, Select } from "@bikiran/inputs";
import { addOption } from "@/bik-lib/utils/option";
import PriceCalculationComp from "@/bikiran/shared/price-calculation-comp/PriceCalculationComp";
import { usePremiumInfo } from "../context/PremiumInfoProvider";

const ModalContent: FC = () => {
  const { closeModal, setMessage, modalData } = useTemplate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    userId: modalData?.userId || 0,
    packageId: modalData?.packageId || 0,
    subType: modalData?.subType || "",
    title: modalData?.title || "",
    description: modalData?.description || "",
    contractPrice: modalData?.contractPrice || "",
    contractOfferPrice: modalData?.contractPriceOffer || "",
    contractVatPercent: modalData?.contractVatPercent || "",
    contractDuration: modalData?.contractDuration || "",
    contractUnitName: modalData?.contractUnitName || "",
    identityName: modalData?.identityName || "",
    contractCurrency: modalData?.contractCurrency || "",
    contractCurrencyRate: modalData?.contractCurrencyRate || "",
    dateStarted: modalData?.timeIssue || "",
  });
  const { post } = useApi();
  const { data } = usePremiumInfo();

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
      ...formData,
      userId: modalData?.user?.id,
      packageId: 0,
    };
    setLoading(true);
    post(`/admin/premium-contract/${modalData?.id}/update`, payload)
      .then((res) => {
        setMessage(res.message);
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
  const unitNames: string[] = data?.filters?.unitNames || [];

  return (
    <div className="space-y-3">
      <div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <Select
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
            disabled={formData.currency === "USD"}
          />
        </div>
      </div>
      <PriceCalculationComp
        formData={formData}
        handleOnChange={handleChange}
        currency={formData.contractCurrency || "_"}
        unit={`${formData?.contractDuration || "_"} ${formData?.contractUnitName || "_"}`}
      />
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
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalUpdatePremium = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "update-premium"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Premium Subscription</DialogTitle>
          <DialogDescription className="uppercase">
            Subscription id : {modalData?.id}
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdatePremium;
