"use client";
import { FC } from "react";
import { cn } from "@/bik-lib/utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { rolesMap } from "../components/project-invitation/projectInvitationConstants";
import { TInvAllowedPermission } from "../components/project-invitation/projectInvitationTypes";
import RoleSelectionListComp from "./RoleSelectionListComp";

type Props = {
  formData: any;
  setFormData: any;
  permissions: TInvAllowedPermission;
};

const RoleSelectionComp: FC<Props> = ({
  formData,
  setFormData,
  permissions,
}) => {
  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="w-full h-auto">
        <Select
          defaultValue={formData.role}
          onValueChange={(v) =>
            setFormData({
              role: v,
            })
          }
        >
          <SelectTrigger
            className={cn(
              `w-full focus:!ring-0 focus:!ring-offset-0 focus-visible:outline-none h-[45px]`
            )}
          >
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <h2 className="text-primary font-medium pl-5 py-2.5">
              Advance Permissions
            </h2>
            {rolesMap.slice(0, 2).map((option: any) => (
              <SelectItem key={option.id} value={option.value}>
                {option.title}
              </SelectItem>
            ))}

            <h2 className="text-primary font-medium pl-5 py-2.5">
              Management Permissions
            </h2>
            {rolesMap.slice(2).map((option: any) => (
              <SelectItem key={option.id} value={option.value}>
                {option.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <RoleSelectionListComp
        setFormData={setFormData}
        formData={formData}
        permissions={permissions}
      />
    </div>
  );
};

export default RoleSelectionComp;
