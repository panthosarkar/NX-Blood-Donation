import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { cn } from "@/bik-lib/utils/cn";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { useProjectInvitation } from "./context/ProjectInvitationProvider";
import { TProjectInvitationPayload } from "./projectInvitationTypes";

const assets = ["domain123.com", "domain123.net", "domain123.org"];

const InvitationAssetComp: React.FC<{
  show: boolean;
}> = ({ show }) => {
  const { setFormData, formData } = useProjectInvitation();

  // const assetLists =
  //   permissionData.assetLists?.map((name, index) => ({
  //     id: index,
  //     title: capitalizeFirstLetter(name),
  //     value: name,
  //   })) || [];

  return (
    <div
      className={cn("max-h-0 overflow-hidden transition-all duration-500", {
        "max-h-76": show,
      })}
    >
      <div className="border-b border-primary-500 pb-2 mb-2 inline-block">
        <h2 className="text-primary text-base font-medium">
          {capitalizeFirstLetter(`${formData.assetKey}'s :`) || "--"}
        </h2>
      </div>

      <ul className="max-w-76 space-y-3">
        {assets.map((i, index) => (
          <li
            key={i}
            className="flex items-center gap-2 border rounded-8 px-3 py-2"
            onClick={() =>
              setFormData((prev: TProjectInvitationPayload) => ({
                ...prev,
                assetId: index,
              }))
            }
          >
            <Checkbox />

            <h3 className="text-primary-700 text-sm font-medium">{i}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvitationAssetComp;
