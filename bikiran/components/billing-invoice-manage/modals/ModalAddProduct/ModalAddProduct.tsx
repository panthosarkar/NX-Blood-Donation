import {
  Dialog,
  DialogBody,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/bikiran/components/ui/dialog";
import { Button } from "@bikiran/button";
import { Select } from "@bikiran/inputs";
import { addOption } from "@/bik-lib/utils/option";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { productOptions } from "./productConstants";
import { useInvoiceInfo } from "../../context/InvoiceManageProvider";
import { formattedPayload, productAddApiUrl } from "./modalUtils";
import { FC, useEffect, useState } from "react";
import { TInputChangeEvent, TState } from "@/bik-lib/types/event";
import useApi from "@/bik-lib/utils/useApi";
import CommonPropertyComp from "./CommonPropertyComp";
import DynamicPropertyComp from "./DynamicPropertyComp";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

const ModalHeader: FC<{
  product: { type: string };
  setProduct: TState<{ type: string }>;
  modalData: any;
}> = ({ modalData, product, setProduct }) => {
  useEffect(() => {
    if (modalData) {
      setProduct({ type: modalData?.type });
    }
  }, [modalData]);

  return (
    <div>
      <Select
        formData={product}
        label={"Add Product"}
        name="type"
        placeholder="Select an option"
        onChange={(ev) => setProduct({ type: ev.target.value })}
        options={productOptions.map((item) =>
          addOption(item.id, capitalizeFirstLetter(item.id), item.id)
        )}
        className="!h-[30px] !p-0 border-none text-left"
        containerClassname="w-50"
      />
    </div>
  );
};

const ModalContent: FC<{
  product: { type: string };
}> = ({ product }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleOnChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const { invoiceInfo, reload } = useInvoiceInfo();
  const { invoice } = invoiceInfo;
  const { closeModal, modalData, setMessage } = useTemplate();

  const { post } = useApi();

  const invoiceId: string = invoice?.id?.toString() || "";

  // const payload = {
  //   title: formData?.title,
  //   subscriptionStart: formData?.subscriptionStart,
  //   quantity: Number(formData?.quantity) || 0,
  //   unitName: "YEAR",
  //   price: formData?.contractPrice,
  //   priceOffer: formData?.contractOfferPrice,
  //   vat: formData?.contractVatPercent,
  //   domain: formData?.domain,
  //   note: formData?.note,
  //   property: "",
  // };
  const payload = formattedPayload(product?.type, formData);

  const handleSave = () => {
    setLoading(true);
    post(productAddApiUrl(product.type, invoiceId), payload)
      .then(({ message }) => {
        setMessage(message);
        reload();
        closeModal();
      })
      .catch((err: Error) => {
        setMessage(err.message);
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
        />
        <div className="flex items-center gap-3 !mb-3">
          <span className="text-xl text-primary font-medium">Property</span>
          <hr className="w-full" />
        </div>
      </div>
      <DynamicPropertyComp
        product={product.type}
        formData={formData}
        handleOnChange={handleOnChange}
        modalData={modalData}
      />
      <div className="flex justify-end gap-2.5 !mt-5">
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
          onClick={handleSave}
        >
          Add {product.type}
        </Button>
      </div>
    </div>
  );
};

const ModalAddProduct: FC = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  const [product, setProduct] = useState<{
    type: string;
  }>({
    type: modalData?.type,
  });

  return (
    <Dialog open={modalType === "add-product"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            <ModalHeader
              modalData={modalData}
              product={product}
              setProduct={setProduct}
            />
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent product={product} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddProduct;
