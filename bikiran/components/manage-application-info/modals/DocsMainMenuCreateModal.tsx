"use client";
import React, { useState } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
// import FocusControl from "@/bikiran/libs/focus-control/focusControl";
import { useApplicationInfo } from "../ApplicationInfoProvider";
import { ApiCreateDocsMenu } from "../operation/DocsMenuOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { InputField } from "@bikiran/inputs";
import { Button } from "@bikiran/button";

type TFormData = {
  applicationId: number;
  parentId: number;
  title: string;
  permalink: string;
};

const DocsMainMenuCreateModal = () => {
  const { authInfo } = useAuth2();
  const { setMessage, modalData, closeModal } = useTemplate();
  const { handleReload, applicationData } = useApplicationInfo();
  const [isError, setIsError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TFormData>({
    applicationId: applicationData?.application?.id || 0,
    parentId: modalData?.id || 0,
    title: "",
    permalink: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    ApiCreateDocsMenu(
      authInfo,
      formData.applicationId,
      formData.parentId,
      formData,
      setIsError
    )
      .then(({ message }) => {
        setMessage(message);
        handleReload();
        closeModal();
        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.message);
        setLoading(false);
      });
  };

  // FocusControl(isError, setIsError, formData);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        label="Title"
        name="title"
        formData={formData}
        onChange={handleChange}
        placeholder="Enter title..."
        // required
      />

      <InputField
        label="Permalink"
        name="permalink"
        formData={formData}
        onChange={handleChange}
        // only allow lowercase, alphanumeric and hyphen in permalink and enter key
        // onKeyPress={(e: React.KeyboardEvent) => {
        //   const regex = /^[a-z0-9-]+$/;
        //   if (!regex.test(e.key) && e.key !== "Enter") {
        //     e.preventDefault();
        //   }
        // }}
        placeholder="Enter permalink..."
        // required
      />
      <div className="flex items-center justify-end gap-2.5">
        <Button variant="red" title="Cancel" onClick={() => closeModal()} />
        <Button type="submit" loading={loading} title="Create" />
      </div>
    </form>
  );
};

export default DocsMainMenuCreateModal;
