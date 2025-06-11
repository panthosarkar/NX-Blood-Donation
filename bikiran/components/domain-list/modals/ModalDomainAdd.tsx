import { FC, useState, useCallback, useEffect, useRef } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { TAddDomainPayload, TDomainPackage } from "../domainListTypes";
import SetCurrencyModalComp from "./UserSetCurrencyModalComp";
import SetDateModalComp from "./SetDateModalComp";
import DomainSelectSectionModalComp from "./DomainSelectSectionModalComp";
import dayjs from "dayjs";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { useDomainList } from "../context/DomainListProvider";
import PriceCalculationComp from "@/bikiran/shared/price-calculation-comp/PriceCalculationComp";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import { AnimatedTextArea } from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";
import { TApiResponse } from "@/bik-lib/types/response";
import { Button } from "@bikiran/button";
import { round } from "@/bik-lib/utils/math";

const ModalContent: FC = () => {
  const { get, post } = useApi();
  const { reload } = useDomainList();
  const { setMessage, modalData, closeModal } = useTemplate();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TAddDomainPayload>({
    ...({} as TAddDomainPayload),
    contractCurrency: modalData?.contractCurrency || "",
    contractCurrencyRate: modalData?.contractCurrencyRate || 0,
  });
  const [domainLoading, setDomainLoading] = useState<boolean | undefined>(
    undefined
  );
  const [selectedUser, setSelectedUser] = useState<TUser | undefined>(
    modalData?.duplicate === "duplicate-pre-register" ||
      modalData?.duplicate === "duplicate-resellbiz"
      ? {
          id: modalData?.user?.id || 0,
          displayName: modalData?.user?.displayName || "",
          email: modalData?.user?.email || "",
          phone: modalData?.user?.phone || "",
          photoUrl: modalData?.user?.photoUrl || "",
        }
      : undefined
  );
  const [errorMassage, setErrorMassage] = useState<string>("");
  const [userData, setUserData] = useState<any[]>([]);

  const formDataRef = useRef(formData);

  const getInfoApiUrl =
    modalData !== "pre-registered" &&
    modalData?.duplicate !== "duplicate-pre-register"
      ? `/admin/domain-add-resellbiz/package-info`
      : `/admin/domain-add-prereg/package-info`;

  const postApiUrl =
    modalData !== "pre-registered" &&
    modalData?.duplicate !== "duplicate-pre-register"
      ? `/admin/domain-add-resellbiz/add`
      : `/admin/domain-add-prereg/add`;

  const debouncedSearchDomain = useCallback(
    (value: string, updatedFormData: TAddDomainPayload) => {
      setDomainLoading(true);
      get<TDomainPackage>(getInfoApiUrl, {
        domain: value,
        currency: updatedFormData.contractCurrency,
        rate: updatedFormData.contractCurrencyRate.toString(),
      })
        .then(({ data }) => {
          if (data) {
            setErrorMassage("");
            setFormData((prev) => ({
              ...prev,
              title: data.title,
              subscriptionStart: dayjs(data.timeRegister * 1000).format(
                "YYYY-MM-DD"
              ),
              subscriptionEnd: dayjs(data.timeExpire * 1000).format(
                "YYYY-MM-DD"
              ),
              contractPrice: round(data?.price),
              contractPriceOffer: round(data.priceOffer),
              vat: data.vat,
            }));
          }
        })
        .catch((err: Error) => {
          setErrorMassage(err.message);
        })
        .finally(() => {
          setDomainLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    if (formData.domainName && formData.contractCurrencyRate) {
      const handler = setTimeout(() => {
        debouncedSearchDomain(formData.domainName, formDataRef.current);
      }, 500);

      return () => clearTimeout(handler);
    }
  }, [
    formData.domainName,
    formData.contractCurrencyRate,
    debouncedSearchDomain,
  ]);

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "domainName"
          ? value.replace(/[^a-zA-Z0-9-.]/g, "").replace(/\s/g, "")
          : value,
    }));
  };

  const handleSubmit = () => {
    setMessage("Adding domain...");
    setLoading(true);
    const payload = {
      userId: selectedUser?.id,
      ...formData,
      domainName: formData?.domainName?.trim(),
      contractPrice: formData?.contractPrice,
      contractPriceOffer: formData?.contractPriceOffer,
      contractVatPercent: formData?.contractVatPercent,
    };
    post<TApiResponse<null>>(postApiUrl, payload)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((error: Error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="">
      <div className="mb-4 space-y-4">
        <UserSearchComp
          formData={formData}
          selectedUser={selectedUser}
          setFormData={setFormData}
          setSelectedUser={setSelectedUser}
          userData={userData}
          setUserData={setUserData}
        />
        <SetCurrencyModalComp
          formData={formData}
          setFormData={setFormData}
          handleOnChange={handleOnChange}
        />
        <DomainSelectSectionModalComp
          formData={formData}
          handleOnChange={handleOnChange}
          domainLoading={domainLoading}
          errorMassage={errorMassage}
        />
        <SetDateModalComp
          formData={formData}
          handleOnChange={handleOnChange}
          key={formData.subscriptionStart}
          modalData={modalData}
        />
        <PriceCalculationComp
          formData={formData}
          handleOnChange={handleOnChange}
          currency={formData.contractCurrency || "_"}
          unit={"YEAR"}
        />
        <AnimatedTextArea
          label="Note"
          name="note"
          className="h-24"
          formData={formData}
          onChange={handleOnChange}
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
        >
          Add
        </Button>
      </div>
    </div>
  );
};

const ModalDomainAdd: FC = () => {
  const { modalType, closeModal, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "domain-add"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            Add Domain{" "}
            <span className="text-sm font-normal">
              {modalData === "resell-biz"
                ? "(Resellbiz)"
                : modalData === "pre-registered"
                  ? "(Pre-Registered)"
                  : ""}
            </span>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDomainAdd;
