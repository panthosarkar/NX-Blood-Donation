import { FC } from "react";
import { iconAlert, iconLoading, iconTick } from "./icons/Icons";
import { cn } from "@/bik-lib/utils/cn";

export const ValidationCheck: FC<{
  loading?: boolean | undefined;
  valid?: boolean | undefined;
  className?: string;
  loadingIcon?: any;
  alertIcon?: any;
  tickIcon?: any;
}> = ({ loading, valid, className, tickIcon, alertIcon, loadingIcon }) => {
  return (
    <div className={cn("absolute", className)}>
      {loading
        ? loadingIcon
          ? loadingIcon
          : iconLoading()
        : loading !== undefined &&
          valid !== undefined &&
          (valid
            ? tickIcon
              ? tickIcon
              : iconTick()
            : alertIcon
              ? alertIcon
              : iconAlert())}
      {loading === undefined && valid === undefined && null}
    </div>
  );
};
