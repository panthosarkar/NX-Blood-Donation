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
import { Button } from "@bikiran/button";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useHosting } from "../context/HostingPricingProvider";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedInputField, InputField, Select } from "@bikiran/inputs";
import { CopyWrapper } from "@bikiran/utils";
import useApi from "@/bik-lib/utils/useApi";
type TPayload = {
  title: string;
  serverHost: string;
  vendor: string;
  vendorPackageName: string;
};

const ModalContent: FC = () => {
  const { closeModal, modalData, setMessage } = useTemplate();
  const { hostingPriceData, reload } = useHosting();
  const { post } = useApi();

  const [formData, setFormData] = useState<TPayload>({
    serverHost: modalData?.serverHost,
    vendorPackageName: modalData?.vendorPackageName,
    title: modalData?.title,
    vendor: modalData?.vendor,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateServer = () => {
    setLoading(true);
    post(
      `/admin/hosting/packages/${modalData?.id}/update-server-info`,
      formData
    )
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

  return (
    <div className="space-y-3">
      <InputField
        formData={formData}
        label="Title"
        name="title"
        className="pointer-events-none"
        onChange={handleChange}
        disabled
      />
      <Select
        formData={formData}
        name="vendor"
        label={"Select Vendor"}
        placeholder="Select Vendor"
        containerClassname="grid grid-cols-[200px_auto] items-center [&_.wrapper]:!mt-0"
        onChange={handleChange}
        options={hostingPriceData?.vendors?.map((item) =>
          addOption(item, item, item)
        )}
      />
      <Select
        formData={formData}
        name="serverHost"
        label={"Select Hostname"}
        placeholder="Select Hostname"
        onChange={handleChange}
        containerClassname="grid grid-cols-[200px_auto] items-center [&_.wrapper]:!mt-0"
        options={hostingPriceData?.cpServers?.map((item) =>
          addOption(item, item, item)
        )}
      />
      <InputField
        formData={formData}
        label="Package"
        name="vendorPackageName"
        parentClassName="grid grid-cols-[200px_auto] items-center [&_.wrapper]:!mt-0"
        className=""
        onChange={handleChange}
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
          onClick={updateServer}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalServerConfig = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog
      open={modalType === "hosting-server-config"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Server Configuration</DialogTitle>
          <DialogDescription className="uppercase group flex gap-1">
            Package Id : <CopyWrapper content={modalData?.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalServerConfig;
