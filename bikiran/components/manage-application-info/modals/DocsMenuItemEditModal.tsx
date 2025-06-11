"use client";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
// import FocusControl from "@/bikiran/libs/focus-control/focusControl";

import React, { useState } from "react";
import { useApplicationInfo } from "../ApplicationInfoProvider";
import { ApiUpdateDocsMenu } from "../operation/DocsMenuOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { AnimatedTextArea, InputField } from "@bikiran/inputs";
import { Button } from "@bikiran/button";

type TFormData = {
  id: number;
  applicationId: number;
  title: string;
  permalink: string;
  status: string;
  note: string;
};

const DocsMenuItemEditModal = () => {
  const { authInfo } = useAuth2();
  const { setMessage, modalData, closeModal } = useTemplate();
  const { handleReload, applicationData } = useApplicationInfo();
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TFormData>({
    id: modalData?.id || 0,
    applicationId: applicationData?.application?.id || 0,
    title: modalData?.title || "",
    permalink: modalData?.permalink || "",
    status: modalData?.status || "",
    note: modalData?.note || "",
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
    ApiUpdateDocsMenu(
      authInfo,
      formData.applicationId,
      formData.id,
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
        // only allow lowercase, alphanumeric and hyphen in permalink
        // onKeyPress={(e: KeyboardEvent) => {
        //   const regex = /^[a-z0-9-]+$/;
        //   if (!regex.test(e.key)) {
        //     e.preventDefault();
        //   }
        // }}
        placeholder="Enter permalink..."
        // required
      />

      {/* <SelectOptionFe
        label="Status"
        name="status"
        formData={formData}
        onChange={handleChange}
        options={["Active", "Inactive"].map((item) =>
          addOption(item, item, item.toLowerCase())
        )}
        required
      /> */}
      <AnimatedTextArea
        label="Note"
        name="note"
        formData={formData}
        onChange={handleChange}

        // required
      />
      <div className="flex items-center justify-end gap-2.5">
        <Button variant="red" title="Cancel" onClick={() => closeModal()} />
        <Button type="submit" loading={loading} title="Update" />
      </div>
    </form>
  );
};

export default DocsMenuItemEditModal;
