import React from "react";
import HeaderLeftCol from "./components/HeaderLeftCol";
import { useDocsContent } from "../../ManageDocsContentProvider";
import { ButtonRefresh } from "@/bik-lib/lib/button";

const DocsContentHeader = () => {
  const { handleReload, docsContentData } = useDocsContent();
  return (
    <div className="flex justify-between items-start ">
      <HeaderLeftCol data={docsContentData} />
      <ButtonRefresh onClick={handleReload} disabled={!docsContentData} />
    </div>
  );
};

export default DocsContentHeader;
