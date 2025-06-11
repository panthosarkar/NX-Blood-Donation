"use client";
import {
  Dialog,
  DialogBody,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { icons } from "@/bikiran/lib/icons";
import { Button } from "@bikiran/button";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useManageApp } from "../context/ManageApplicationProvider";
import { FC, useState } from "react";
import { LoadingRoundDottedIcon } from "@/bik-lib/features/Profile/icons";
import { AnimatedTextArea, InputField } from "@bikiran/inputs";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";

const ModalContent = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { reFetch } = useManageApp();
  const { put } = useApi();
  const { setMessage, closeModal, modalData } = useTemplate();

  const data = modalData;

  const [formData, setFormData] = useState({
    id: data?.id || 0,
    title: data?.title || "",
    uniqueName: data?.uniqueName || "",
    websiteUrl: data?.websiteUrl || "",
    logoUrl: data?.logoUrl || "",
    note: data?.note || "",
  });

  const handleChange = (ev: any) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // upload image
  const handleUploadLogo = (e: any) => {
    const file = e.target.files![0];
    if (file) {
      const fileData = new FormData();
      fileData.append("file", file);

      setUploading(true);
      put("/upload", fileData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(async ({ data }) => {
          setUploading(false);
          setFormData((prev) => {
            return {
              ...prev,
              logoUrl: data?.publicUrl,
            };
          });
        })
        .catch((ex) => {
          setUploading(false);
          setMessage(ex.message);
          // filed then input will be cleared
          e.target.value = "";
        });
    }
  };

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    setLoading(true);
    put(`/admin/application/${data?.id.toString()}/update-basic`, formData)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reFetch();
      })
      .catch((ex) => {
        setLoading(false);
        setMessage(ex.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex items-end gap-2">
        <div className="flex flex-col w-[calc(100%_-_40px_-_8px)] custom-field relative">
          <label
            htmlFor="uploadImage"
            className="pl-1 mb-1 text-sm md:text-base capitalize w-full font-normal text-left"
          >
            Logo
          </label>
          <Input
            id="uploadImage"
            type="file"
            name="uploadImage"
            onChange={handleUploadLogo}
            accept="image/*"
            className="h-10 disabled:bg-primary-50 disabled:text-primary-700 disabled:pointer-events-none shadow-none"
            disabled={uploading}
          />
          {uploading && (
            <span className="absolute flex w-10 top-7 left-2 text-base text-primary rounded-lg h-10">
              <LoadingRoundDottedIcon />
            </span>
          )}
        </div>
        <div className="size-10 border border-primary-200 overflow-hidden rounded-lg">
          <Image
            src={formData.logoUrl || icons.iconDefaultApp}
            alt="application logo"
            width={100}
            height={100}
            className="size-full"
          />
        </div>
      </div>
      <InputField
        label="Application Title"
        name="title"
        formData={formData}
        onChange={handleChange}
        placeholder="Application Title"
      />

      <InputField
        label="Application Unique name"
        name="uniqueName"
        formData={formData}
        onChange={handleChange}
        placeholder="Application Unique Name"
        disabled
      />

      <InputField
        label="Website URL"
        name="websiteUrl"
        formData={formData}
        onChange={handleChange}
        placeholder="Website url"
      />
      <AnimatedTextArea
        label="Note"
        name="note"
        formData={formData}
        onChange={handleChange}
        className="h-24"
      />
      <div className="flex items-center justify-end gap-2.5">
        <Button
          variant="gray"
          onClick={() => closeModal()}
          className="w-28 h-9"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          type="submit"
          loading={loading}
          disabled={uploading}
          className="w-28 h-9"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

const ModalUpdateApplication: FC = () => {
  const { modalType, closeModal, modalData } = useTemplate();

  return (
    <Dialog open={modalType === "update-application"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Application</DialogTitle>
        </DialogHeader>
        <DialogBody>{modalData !== null && <ModalContent />}</DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateApplication;
