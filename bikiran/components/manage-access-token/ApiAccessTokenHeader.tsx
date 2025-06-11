import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import React, { FC } from "react";
import { useAccessToken } from "./context/ApiAccessTokenProvider";
import { Button } from "@bikiran/button";

const ApiAccessTokenHeader: FC = () => {
  const { openModal } = useTemplate();
  const { reload } = useAccessToken();
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-primary text-xl font-medium">Access Token</h2>
      <div className="flex items-center gap-2">
        <ButtonRefresh className="size-10" onClick={reload} />
        <Button
          variant="secondary"
          title="+ Generate New Token"
          className="px-4 h-10 text-base"
          onClick={() => openModal("create-token")}
        />
      </div>
    </div>
  );
};

export default ApiAccessTokenHeader;
