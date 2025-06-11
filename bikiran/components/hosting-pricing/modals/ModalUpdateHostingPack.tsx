/* eslint-disable no-unused-vars */
import { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { THostingPkg } from "../HostingTypes";
import { useHosting } from "../context/HostingPricingProvider";
import { addOption } from "@/bik-lib/utils/option";
import {
  AnimatedInputField,
  CalculationInputField,
  AnimatedSelect,
} from "@bikiran/inputs";
import { Button } from "@bikiran/button";
import { round } from "@/bik-lib/utils/math";
import useApi from "@/bik-lib/utils/useApi";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { post } = useApi();
  const { setMessage, modalData } = useTemplate();
  const { reload, hostingPriceData } = useHosting();

  const subTypes = hostingPriceData.subTypes;
  const diskTypes = hostingPriceData.diskTypes;

  const updateHostingPackage = (payload: any) => {
    setLoading(true);
    setMessage("Updating...");
    post<THostingPkg>(`/admin/hosting/packages/${modalData.id}/update`, payload)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [formData, setFormData] = useState<Partial<THostingPkg>>({
    title: modalData?.title,
    minDuration: modalData?.minDuration,
    selectedDuration: modalData?.selectedDuration,
    price: round(modalData?.price),
    pricePromotion: round(modalData?.pricePromotion),
    priceSetup: round(modalData?.priceSetup),
    priceRestore: round(modalData?.priceRestore),
    subType: modalData?.subType,
    disk: modalData?.disk,
    bandwidth: modalData?.bandwidth,
    cpu: modalData?.cpu,
    ram: modalData?.ram,
    diskType: modalData?.diskType,
    ep: modalData?.ep,
    io: modalData?.io,
    location: modalData?.location,
  });

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateHostingPackage(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex gap-2">
        <AnimatedInputField
          label="Title"
          name="title"
          formData={formData}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-2">
        <CalculationInputField
          label="Promotion Price"
          name="pricePromotion"
          currency="USD"
          placeholder="Enter promotion price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Price"
          name="price"
          currency="USD"
          placeholder="Enter price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Setup Price"
          name="priceSetup"
          currency="USD"
          placeholder="Enter setup price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Restore Price"
          name="priceRestore"
          currency="USD"
          placeholder="Enter restore price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>

      <div className="flex gap-2">
        <CalculationInputField
          label="Min Duration (months)"
          name="minDuration"
          placeholder="Enter min duration"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Selected Duration (months)"
          name="selectedDuration"
          placeholder="Enter selected duration"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>

      <div className="grid grid-cols-2 gap-2 items-center">
        <AnimatedSelect
          formData={formData}
          label={""}
          name="subType"
          placeholder="Select Subtype"
          onChange={handleChange}
          options={subTypes.map((item) => addOption(item, item, item))}
        />
        <AnimatedInputField
          label="Disk (MB)"
          name="disk"
          formData={formData}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-2">
        <AnimatedInputField
          label="Bandwidth (MB)"
          name="bandwidth"
          formData={formData}
          onChange={handleChange}
        />
        <AnimatedInputField
          label="CPU (cores)"
          name="cpu"
          formData={formData}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 items-center">
        <AnimatedInputField
          label="RAM (MB)"
          name="ram"
          formData={formData}
          onChange={handleChange}
        />
        <AnimatedSelect
          formData={formData}
          label={""}
          name="diskType"
          placeholder="Select Disk Type"
          onChange={handleChange}
          options={diskTypes.map((item) => addOption(item, item, item))}
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
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalUpdateHostingPackage: FC<{}> = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog
      open={modalType === "update-hosting-package"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Package</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateHostingPackage;
