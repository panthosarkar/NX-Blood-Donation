import React, { useEffect } from "react";
import { cn } from "@/bik-lib/utils/cn";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

import { TInputChangeEvent } from "@/bik-lib/types/event";
import { Switch } from "../components/ui/switch";
import {
  TProjectInvitationPayload,
  TInvAllowedPermission,
  TRole,
} from "../components/project-invitation/projectInvitationTypes";
import { Skeleton } from "../components/ui/skeleton";

type Props = {
  formData: any;
  setFormData: any;
  permissions: TInvAllowedPermission;
};

const RoleSelectionListComp: React.FC<Props> = ({
  formData,
  setFormData,
  permissions,
}) => {
  const role: TRole = formData.role as TRole;

  useEffect(() => {
    if (formData.role.length > 0) {
      setFormData((prev: TProjectInvitationPayload) => ({
        ...prev,
        permissions: [...permissions?.[role]],
      }));
    }
  }, [formData.role.length, permissions, role, setFormData]);

  const selectItems = (type: "permissions", data: string) => {
    setFormData((prev: TProjectInvitationPayload) => {
      const prevDt: TProjectInvitationPayload = { ...prev };
      if (prevDt?.[type].includes(data)) {
        prevDt[type] = prevDt?.[type].filter((i) => i !== data);
      } else {
        prevDt?.[type].push(data);
      }
      return prevDt;
    });
  };

  return (
    <div className={cn("overflow-hidden transition-all duration-500")}>
      <div className="border-b border-primary-500 pb-2 mb-2 inline-block">
        <h2 className="text-primary text-base font-medium">Permissions</h2>
      </div>

      <ul className="w-full space-y-3">
        {!permissions
          ? [1, 2].map((i) => <Skeleton key={i} className="w-full h-5" />)
          : null}
        {permissions?.[role]?.map((i) => (
          <li
            key={i}
            className="flex justify-between items-center pb-2 border-b"
            onClick={() => selectItems("permissions", i)}
          >
            <h3 className="text-primary-700 text-sm font-medium">
              {capitalizeFirstLetter(i)}
            </h3>
            <Switch checked={formData?.permissions?.includes(i) || false} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleSelectionListComp;
