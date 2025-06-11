import React, { useEffect } from "react";
import { cn } from "@/bik-lib/utils/cn";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import {
  initialAllowedPermissions,
  useProjectInvitation,
} from "./context/ProjectInvitationProvider";
import {
  TInvAllowedPermission,
  TProjectInvitationPayload,
  TRole,
} from "./projectInvitationTypes";
import { Switch } from "../ui/switch";

const InvitationRoleComp: React.FC<{
  show: boolean;
}> = ({ show }) => {
  const { selectItems, permissionData, formData, setFormData } =
    useProjectInvitation();
  const permissions: TInvAllowedPermission =
    permissionData.assetLists?.allowedPermissions || initialAllowedPermissions;
  const role: TRole = formData.role as TRole;

  useEffect(() => {
    if (formData.role.length > 0) {
      setFormData((prev: TProjectInvitationPayload) => ({
        ...prev,
        permissions: [...permissions?.[role]],
      }));
    }
  }, [formData.role.length, permissions, role, setFormData]);

  return (
    <div
      className={cn("max-h-0 overflow-hidden transition-all duration-500", {
        "max-h-[600px]": show,
      })}
    >
      <div className="border-b border-primary-500 pb-2 mb-2 inline-block">
        <h2 className="text-primary text-base font-medium">Permissions</h2>
      </div>

      <ul className="w-full space-y-3">
        {permissions?.[role]?.map((i) => (
          <li
            key={i}
            className="flex justify-between items-center pb-2 border-b"
            onClick={() => selectItems("permissions", i)}
          >
            <h3 className="text-primary-700 text-sm font-medium">
              {capitalizeFirstLetter(i)}
            </h3>
            <Switch checked={formData.permissions.includes(i)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvitationRoleComp;
