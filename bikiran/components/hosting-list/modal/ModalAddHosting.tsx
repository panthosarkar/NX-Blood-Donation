/* eslint-disable no-unused-vars */
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { THostingCreatePayload } from "../hostingListType";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { addOption } from "@/bik-lib/utils/option";
import { useHostingList } from "../context/HostingListProvider";
import {
  AnimatedInputField,
  InputField,
  AnimatedSelect,
  DateInputField,
  DurationInput,
} from "@bikiran/inputs";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import useApi from "@/bik-lib/utils/useApi";
import { Button } from "@bikiran/button";
import { round } from "@/bik-lib/utils/math";
import { showInt } from "@/bik-lib/utils/show";
import PriceCalculationComp from "@/bikiran/shared/price-calculation-comp/PriceCalculationComp";

const ModalBody = () => {
  const { closeModal, setMessage, modalData } = useTemplate();
  const { currencies, packageData, reload } = useHostingList();
  const { post, get } = useApi();

  const [formData, setFormData] = useState<Record<string, any>>({
    contractDuration: modalData?.contractDuration || 0,
    contractUnitName: modalData?.contractUnitName || "",
    contractCurrency: modalData?.contractCurrency.toString() || "",
    contractCurrencyRate: modalData?.contractCurrencyRate || 1,
    contractPrice: modalData?.contractPrice || 0,
    contractPriceOffer: modalData?.contractPriceOffer || 0,
    contractVatPercent: modalData?.contractVatPercent || 0,
    title: modalData?.title || "",
    packageId: modalData?.packageId.toString() || "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TUser | undefined>(
    modalData
      ? {
          id: modalData?.user?.id || 0,
          displayName: modalData?.user?.displayName || "",
          email: modalData?.user?.email || "",
          phone: modalData?.user?.phone || "",
          photoUrl: modalData?.user?.photoUrl || "",
        }
      : undefined
  );
  const [userData, setUserData] = useState<any[]>([]);
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name === "domain") {
      // Only allow alphanumeric, dash, and dot, and remove all spaces
      const filteredValue = value
        .replace(/\s+/g, "")
        .replace(/[^a-zA-Z0-9.-]/g, "");
      setFormData((prev: any) => ({ ...prev, [name]: filteredValue }));
    } else if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    setLoading(true);
    if (formData?.packageId && formData?.contractCurrency) {
      get(`/admin/hosting-add/package-info`, {
        packageId: formData?.packageId,
        currency: formData?.contractCurrency,
      })
        .then(({ data }) => {
          setFormData((prev: any) => ({
            ...prev,
            contractPrice: round(data?.price),
            contractPriceOffer: round(data?.priceOffer),
            contractVatPercent: data?.priceVat,
            contractDuration: data?.quantity,
            contractUnitName: data?.unitName,
            title: data?.title,
          }));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [formData?.packageId, formData?.contractCurrency]);

  useEffect(() => {
    if (formData.contractCurrency === "BDT") {
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

  //Create Hosting user
  const addHostingUser = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setMessage("Creating...");
    const payload = {
      ...formData,
      userId: selectedUser?.id,
    };
    post<THostingCreatePayload>(`/admin/hosting-add`, payload)
      .then(({ message }) => {
        setMessage(message || "");
        closeModal();
        reload();
      })
      .catch((err) => {
        setMessage(err.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="space-y-3.5" onSubmit={addHostingUser}>
      <UserSearchComp
        formData={formData}
        selectedUser={selectedUser}
        setFormData={setFormData}
        setSelectedUser={setSelectedUser}
        setUserData={setUserData}
        userData={userData}
      />
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
      <AnimatedSelect
        label=""
        name="packageId"
        placeholder="Select package"
        options={
          packageData?.map((item) => addOption(item.id, item.title, item.id)) ||
          []
        }
        className="overflow-hidden [&>.value]:line-clamp-1 "
        formData={formData}
        onChange={handleChange}
      />

      <AnimatedInputField
        formData={formData}
        label="Title"
        name="title"
        onChange={handleChange}
      />
      <AnimatedInputField
        formData={formData}
        label="Domain"
        name="domain"
        onChange={handleChange}
      />

      <div className="grid sm:grid-cols-2 items-center gap-2">
        <DurationInput
          durationName="contractDuration"
          unitName="contractUnitName"
          formData={formData}
          onChange={handleChange}
          options={["MONTH", "YEAR"].map((i) => addOption(i, i, i))}
        />
        <DateInputField
          formData={formData}
          name="dateStarted"
          onChange={handleChange}
          className="h-[45px]"
        />
      </div>
      <PriceCalculationComp
        formData={formData}
        handleOnChange={handleChange}
        unit={formData?.contractUnitName || "_"}
        currency={formData?.contractCurrency || "_"}
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
          disabled={loading}
          type="submit"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

const ModalAddHosting: FC = () => {
  const { closeModal, modalType, setMessage, modalData } = useTemplate();

  return (
    <Dialog open={modalType === "create-hosting"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Add Hosting</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalBody />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddHosting;
