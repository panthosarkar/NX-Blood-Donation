"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { Button } from "@bikiran/button";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import { useInvoiceInfo } from "@/bikiran/components/billing-invoice-manage/context/InvoiceManageProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import dayjs from "dayjs";
import CommonPropertyComp from "@/bikiran/components/billing-invoice-manage/modals/ModalAddProduct/CommonPropertyComp";
import DynamicPropertyComp from "@/bikiran/components/billing-invoice-manage/modals/ModalAddProduct/DynamicPropertyComp";
import useApi from "@/bik-lib/utils/useApi";
import { round } from "@/bik-lib/utils/math";
import { THostingPayload } from "./InvoicePayloadTypes";
import {
  formattedPayload,
  productUpdateApiUrl,
} from "./ModalAddProduct/modalUtils";

const ModalContent: FC = () => {
  const { modalData, closeModal, setMessage } = useTemplate();
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<any>({
    title: modalData?.title || "",
    contractPrice: round(modalData?.price) || "",
    contractPriceOffer: round(modalData?.priceOffer) || "",
    contractVatPercent: modalData?.vat || "",
    subscriptionStart: dayjs(modalData?.subscriptionStart * 1000).format(
      "YYYY-MM-DD"
    ),
    contractDuration: `${modalData?.quantity}` || "",
    domain: modalData?.domain || "",
    contractUnitName: modalData?.unitName || "",
    note: modalData?.note || "",

    // hosting properties
    bandwidth: modalData?.packageData?.bandwidth || "",
    cpu: modalData?.packageData?.cpu || "",
    disk: modalData?.packageData?.disk || "",
    ep: modalData?.packageData?.ep || "",
    io: modalData?.packageData?.io || "",
    ram: modalData?.packageData?.ram || "",

    // premium properties
    identity: modalData?.domain || "",
    description: modalData?.description || "",
  });

  const { put } = useApi();
  const { invoiceInfo, reload } = useInvoiceInfo();
  const { invoice } = invoiceInfo;

  const handleOnChange = (e: TInputChangeEvent) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const hostingPayload: THostingPayload = {
    title: formData?.title,
    subscriptionStart: formData?.subscriptionStart,
    quantity: Number(formData?.contractDuration) || 0,
    unitName: formData?.contractUnitName,
    domain: formData?.domain,
    price: Number(formData?.contractPrice) || 0,
    priceOffer: Number(formData?.contractPriceOffer) || 0,
    vat: Number(formData?.contractVatPercent) || 0,
    note: formData?.note,
    bandwidth: Number(formData?.bandwidth) || 0,
    cpu: Number(formData?.cpu) || 0,
    disk: Number(formData?.disk) || 0,
    ep: Number(formData?.ep) || 0,
    io: Number(formData?.io) || 0,
    ram: Number(formData?.ram) || 0,
  };

  const payload = formattedPayload(modalData?.assetKey, formData);
  // TODO : has some payload related issue

  const updateInvoice = () => {
    setLoading(true);
    put(
      productUpdateApiUrl(
        modalData.assetKey.toLowerCase(),
        invoice.id,
        modalData?.id
      ),
      hostingPayload
    )
      .then(({ message }) => {
        setMessage(message);
        reload();
        closeModal();
      })
      .catch((er: Error) => {
        setMessage(er.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-2">
      <div className="space-y-4 mt-3">
        <CommonPropertyComp
          formData={formData}
          handleOnChange={handleOnChange}
          modalData={modalData}
        />
        <div className="flex items-center gap-3 !mb-3">
          <span className="text-xl text-primary font-medium">Property</span>
          <hr className="w-full" />
        </div>
      </div>
      <DynamicPropertyComp
        product={modalData?.assetKey.toLowerCase()}
        formData={formData}
        handleOnChange={handleOnChange}
        modalData={modalData}
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
          className="px-3 h-10"
          loading={loading}
          onClick={() => updateInvoice()}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalUpdateProduct = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog
      open={modalType === "update-invoice-product"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col gap-2">
              <span>Update Product</span>
              <span className="text-primary-700 text-xs">
                {modalData?.title} ({modalData?.assetKey})
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateProduct;
