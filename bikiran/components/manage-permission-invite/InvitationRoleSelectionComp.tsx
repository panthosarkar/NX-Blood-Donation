"use client";
import { FC } from "react";
import { useProjectInvitation } from "./context/ProjectInvitationProvider";
import { rolesMap } from "./projectInvitationConstants";
import { cn } from "@/bik-lib/utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import InvitationRoleComp from "./InvitationRoleComp";

const InvitationRoleSelectionComp: FC = () => {
  const { formData, onChange } = useProjectInvitation();

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="w-full h-auto">
        <Select
          defaultValue={formData.role}
          onValueChange={(v) =>
            onChange({
              target: {
                name: "role",
                value: v,
              },
            } as any)
          }
        >
          <SelectTrigger
            className={cn(
              `w-full focus:!ring-0 focus:!ring-offset-0 focus-visible:outline-none h-[45px]`,
              {
                "bg-primary-100 pointer-events-none":
                  formData.assetKey.length === 0,
              }
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
      <InvitationRoleComp show={formData.role.length > 0} />
    </div>
  );
};

export default InvitationRoleSelectionComp;
