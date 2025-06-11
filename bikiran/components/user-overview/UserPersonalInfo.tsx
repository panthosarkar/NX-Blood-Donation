import InfoWrapper, {
  InfoDivider,
} from "@/bik-lib/features/info-wrapper/InfoWrapper";
import React, { FC } from "react";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { TUserProfile } from "./userListType";
import { cn } from "@/bik-lib/utils/cn";

const InfoRow: FC<{ label: string; value: any; className?: string }> = ({
  label,
  value,
  className,
}) => (
  <div className="grid grid-cols-2 gap-2">
    <div className="w-full text-sm text-primary-500 flex justify-between">
      {label} <span className="pr-2">:</span>
    </div>
    <div
      className={cn(`w-full text-sm text-ellipsis overflow-hidden`, className)}
    >
      {value || "---"}
    </div>
  </div>
);

const UserPersonalInfo: FC<{ data: TUserProfile }> = ({ data }) => {
  return (
    <InfoWrapper className="!p-5">
      <InfoDivider title="Personal Information" />
      <div className="space-y-4 mt-2">
        <div className="grid grid-cols-2 gap-2">
          <InfoRow label="Name" value={data.displayName} />
          <InfoRow label="Role" value={capitalizeFirstLetter(data?.type)} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <InfoRow label="Username" value={data?.username} />
          <InfoRow label="IP Address" value={data?.ipString} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <InfoRow label="Sex" value={capitalizeFirstLetter(data?.sex)} />
          <InfoRow
            label="2FA"
            value={data?.isTwoFaEnabled ? "Enabled" : "Disabled"}
            className={`font-medium ${
              data?.isTwoFaEnabled ? "text-success" : "text-error"
            }`}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <InfoRow label="Date Of Birth" value={data?.dobString} />
        </div>
      </div>
    </InfoWrapper>
  );
};

export default UserPersonalInfo;
