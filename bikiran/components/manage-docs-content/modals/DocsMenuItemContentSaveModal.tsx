"use client";
import React, { useMemo, useState } from "react";
import { useDocsContent } from "../ManageDocsContentProvider";
import { ApiDocsMenuContentSave } from "../operation/DocsContentOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Button } from "@bikiran/button";

const DocsMenuItemContentSaveModal = ({}) => {
  const { authInfo } = useAuth2();
  const { setMessage, modalData, closeModal } = useTemplate();
  const { handleReload, docsContentData } = useDocsContent();
  const [loading, setLoading] = useState<boolean>(false);

  const payload = useMemo(() => {
    return {
      applicationId: docsContentData?.application?.id || 0,
      menuId: modalData?.contentData?.menuId || 0,
      contentId: modalData?.contentData?.id || 0,
      content: modalData?.initialContent || {},
    };
  }, [docsContentData, modalData]);

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    setLoading(true);
    ApiDocsMenuContentSave(
      authInfo,
      payload.applicationId,
      payload.menuId,
      payload.contentId,
      payload
    )
      .then(({ message }) => {
        setMessage(message);
        handleReload();
        closeModal();
        setLoading(false);
      })
      .catch((err: any) => {
        setMessage(err.message);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex items-center justify-end gap-2.5">
        <Button variant="red" title="Cancel" onClick={() => closeModal()} />
        <Button type="submit" loading={loading} title="Save" />
      </div>
    </form>
  );
};

export default DocsMenuItemContentSaveModal;
