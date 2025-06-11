"use client";
import React from "react";
import { useProjectInvitation } from "./context/ProjectInvitationProvider";
import { TProjectInvitationPayload } from "./projectInvitationTypes";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";

const InvitationUserEmailComp: React.FC = () => {
  const { setFormData } = useProjectInvitation();

  return (
    <div className="w-full flex items-center gap-2 overflow-hidden mb-3 mt-2.5">
      <ReactMultiEmail
        placeholder="Input your email"
        // emails={emails}
        onChange={(emails: string[]) => {
          // Allow setting emails only if the count is less than or equal to 5
          if (emails.length <= 5) {
            setFormData((prev: TProjectInvitationPayload) => ({
              ...prev,
              emails: emails,
            }));
          }
        }}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default InvitationUserEmailComp;
