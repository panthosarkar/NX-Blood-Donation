import React from "react";
import Image from "next/image";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import iconRefresh from "./lib-icons/icon-refresh.svg";
import { Loader2 } from "lucide-react";
import { TMouseEvent } from "../types/event";

const cName = (variant: string) => {
  switch (variant) {
    case "primary":
      return "bg-primary text-white";
    case "primary-line":
      return "border border-primary text-primary bg-white hover:bg-primary hover:text-white";
    case "secondary":
      return "bg-[#AE00B9] text-white";
    case "secondary-line":
      return "text-[#AE00B9] bg-[#FBF2FB] hover:bg-[#AE00B9] hover:text-white";
    case "secondary-line-bordered":
      return "border border-[#AE00B9] text-[#AE00B9] bg-white hover:bg-[#AE00B9] hover:text-white";
    case "blue":
      return "bg-[#4370FF] text-white";
    case "blue-line":
      return "text-[#4370FF] bg-[#ECF1FF] hover:bg-[#4370FF] hover:text-white";
    case "blue-line-bordered":
      return "border border-[rgba(67,112,255,0.50)] text-[#4370FF] bg-transparent hover:bg-[#4370FF] hover:text-white";
    case "red":
      return "bg-[#F50303] text-white";
    case "red-line":
      return "text-[#F50303] bg-[rgba(245,3,3,0.10)] hover:bg-[#F50303] hover:text-white";
    case "red-line-bordered":
      return "border border-[#F50303] text-[#F50303] bg-white hover:bg-[#F50303] hover:text-white";
    case "pink":
      return "bg-pink text-white";
    case "pink-outline":
      return "bg-[rgba(245,0,87,0.1)] hover:bg-pink hover:text-white text-pink transition-colors";
    case "pink-outline-bordered":
      return "bg-[rgba(245,0,87,0.1)] hover:bg-pink hover:text-white text-pink transition-colors border border-pink";
    case "green":
      return "bg-[#00A143] text-white";
    case "green-outline":
      return "bg-[#E8FAEF] hover:bg-[#00A143] hover:text-white text-[#00A143] transition-colors";
    case "gray":
      return "bg-primary-100 text-primary-500";
    case "yellow":
      return "bg-[#FFA113] text-[#FFA113]";
    case "yellow-outline":
      return "bg-[#FFF1DC] hover:bg-[#FFA113] hover:text-white text-[#FFA113] transition-colors";
    default:
      return "bg-primary text-white";
  }
};

const cn = (...input: ClassValue[]) => twMerge(clsx(input));

// Define common CSS styles as variables
const commonButtonStyles =
  "px-3 py-1 rounded-8 disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none";
const disabledStyles =
  "disabled:bg-slate-500 disabled:grayscale disabled:pointer-events-none";

// Loading component
export const ButtonLoading: React.FC = () => {
  return (
    <div className="size-full bg-primary-50 opacity-50 absolute top-0 left-0">
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    </div>
  );
};

// Define ButtonProps type
interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

type ButtonProps2 = {
  title?: any;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "primary-line"
    | "secondary"
    | "secondary-line"
    | "secondary-line-bordered"
    | "blue"
    | "blue-line"
    | "blue-line-bordered"
    | "red"
    | "red-line"
    | "red-line-bordered"
    | "pink"
    | "pink-outline"
    | "pink-outline-bordered"
    | "green"
    | "green-outline"
    | "yellow-outline"
    | "gray";
  onClick?: (ev: TMouseEvent) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

export const Button = ({
  children,
  title,
  type = "button",
  variant = "primary",
  onClick,
  className,
  disabled,
  loading,
}: ButtonProps2) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "relative px-3 py-1 text-base font-medium rounded-[8px] transition-colors disabled:bg-primary-100 disabled:pointer-events-none disabled:text-primary-500",
        className,
        cName(variant),
        { "pointer-events-none": loading }
      )}
      disabled={disabled}
    >
      {children || title}

      {loading ? (
        <div className="absolute top-0 left-0 size-full text-primary">
          <ButtonLoading />
        </div>
      ) : null}
    </button>
  );
};

// Gray Button Component
export const ButtonGray: React.FC<ButtonProps> = ({
  title,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `bg-primary-100 text-primary-500 relative ${commonButtonStyles}`,
        className
      )}
    >
      {title}
      {loading ? (
        <div className="absolute top-0 left-0 size-full text-primary">
          <ButtonLoading />
        </div>
      ) : null}
    </button>
  );
};

// Secondary Button Component with Loading state
export const ButtonSecondary: React.FC<ButtonProps> = ({
  title,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `relative bg-secondary text-white ${commonButtonStyles} ${disabledStyles}`,
        className
      )}
    >
      {title}
      {loading ? (
        <div className="absolute top-0 left-0 size-full text-primary">
          <ButtonLoading />
        </div>
      ) : null}
    </button>
  );
};

// Green Button Component
export const ButtonGr: React.FC<ButtonProps> = ({
  title,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "bg-[#17dc69] text-white relative",
        commonButtonStyles,
        className
      )}
    >
      {title}
      {loading ? (
        <div className="absolute top-0 left-0 size-full text-primary">
          <ButtonLoading />
        </div>
      ) : null}
    </button>
  );
};

// Pink Outline Button Component
export const ButtonPinkOutline: React.FC<ButtonProps> = ({
  title,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "bg-[rgba(245,0,87,0.1)] hover:bg-pink hover:text-white text-pink transition-colors relative",
        commonButtonStyles,
        className
      )}
    >
      {title}
      {loading ? (
        <div className="absolute top-0 left-0 size-full text-primary">
          <ButtonLoading />
        </div>
      ) : null}
    </button>
  );
};

// Secondary Line Button Component
export const ButtonSecondaryLine: React.FC<ButtonProps> = ({
  title,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group bg-secondary-100 hover:bg-secondary transition-colors relative",
        commonButtonStyles,
        className
      )}
    >
      <span className="text-secondary group-hover:text-white">{title}</span>
      {loading ? (
        <div className="absolute top-0 left-0 size-full text-primary">
          <ButtonLoading />
        </div>
      ) : null}
    </button>
  );
};

// Refresh Button Component
export const ButtonRefresh: React.FC<Partial<ButtonProps>> = ({
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <div className={cn("w-10 h-full", className)}>
      <button
        type="button"
        className={`size-full relative ${
          disabled
            ? "after:absolute after:top-0 after:left-0 after:size-full after:bg-primary-100 after:rounded-[8px]"
            : "cursor-pointer"
        }`}
        disabled={disabled}
        onClick={onClick}
      >
        <Image
          src={iconRefresh}
          alt="refresh"
          width={0}
          height={0}
          sizes="100vw"
          className="size-full"
        />
      </button>
    </div>
  );
};
