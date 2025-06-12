import React, { FC } from "react";
import { cn } from "./cn";

type StatusColorProps = {
  status: string;
  className?: string;
};

const StatusColor: FC<StatusColorProps> = ({ status, className }) => {
  const getColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-success";
      case "success":
        return "text-success";
      case "inactive":
        return "text-error";
      case "suspended":
        return "text-error";
      case "pending":
        return "text-yellow-500";
      case "progressing":
        return "text-green-500";
      case "closed":
        return "text-success";
      case "open":
        return "text-secondary";
      case "completed":
        return "text-secondary";
      case "not-configured":
        return "red-500";
      case "failed":
        return "red-500";
      default:
        return "text-black "; // Default color
    }
  };
  const capitalizeFirstLetter = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  return (
    <span className={cn(getColor(status), className)}>
      {capitalizeFirstLetter(status) || "---"}
    </span>
  );
};

export default StatusColor;
