import React from "react";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2, RefreshCcwDot } from "lucide-react";

const cName = (variant: string) => {
  switch (variant) {
    case "primary":
      return "bg-primary text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "primary-line":
      return "border border-primary text-primary bg-white hover:bg-primary hover:text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "secondary":
      return "bg-secondary text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "secondary-line":
      return "text-secondary bg-secondary-100 hover:bg-secondary hover:text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "secondary-line-bordered":
      return "border border-secondary text-secondary bg-white hover:bg-secondary hover:text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none";
    case "blue":
      return "bg-[#4370FF] text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "blue-line":
      return "text-[#4370FF] bg-[#ECF1FF] hover:bg-[#4370FF] hover:text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "blue-line-bordered":
      return "border border-[rgba(67,112,255,0.50)] text-[#4370FF] bg-transparent hover:bg-[#4370FF] hover:text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "red":
      return "bg-[#F50303] text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "red-line":
      return "text-[#F50303] bg-[rgba(245,3,3,0.10)] hover:bg-[#F50303] hover:text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "red-line-bordered":
      return "border border-[#F50303] text-[#F50303] bg-white hover:bg-[#F50303] hover:text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "pink":
      return "bg-pink text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "pink-outline":
      return "bg-[rgba(245,0,87,0.1)] hover:bg-pink hover:text-white text-pink transition-colors disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "pink-outline-bordered":
      return "bg-[rgba(245,0,87,0.1)] hover:bg-pink hover:text-white text-pink transition-colors border border-pink disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "green":
      return "bg-[#00A143] text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "green-line":
      return "text-[#00A143] bg-[#E9F9F0] hover:bg-[#00A143] hover:text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    case "gray":
      return "bg-primary-100 text-primary-700 disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
    default:
      return "bg-primary text-white disabled:bg-slate-300 disabled:grayscale disabled:pointer-events-none disabled:text-[#4370FF]";
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
    <div className="bg-primary-50 absolute top-0 left-0 size-full opacity-50">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
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
    | "green-line"
    | "gray";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  toolTip?: string;
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
  toolTip,
}: ButtonProps2) => {
  return (
    <button
      title={toolTip}
      type={type}
      onClick={onClick}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-[8px] px-3 py-2 text-base font-medium transition-colors disabled:pointer-events-none disabled:!border-none disabled:!bg-none disabled:grayscale",
        className,
        cName(variant),
        {
          "pointer-events-none select-none": loading,
        },
      )}
      disabled={disabled}
    >
      {children || title}

      {loading ? (
        <div className="text-primary absolute top-0 left-0 size-full">
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
        `bg-primary-100 text-primary-700 relative ${commonButtonStyles}`,
        className,
      )}
    >
      {title}
      {loading ? (
        <div className="text-primary absolute top-0 left-0 size-full">
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
        `bg-secondary relative text-white ${commonButtonStyles} ${disabledStyles}`,
        className,
      )}
    >
      {title}
      {loading ? (
        <div className="text-primary absolute top-0 left-0 size-full">
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
        "relative bg-[#17dc69] text-white",
        commonButtonStyles,
        className,
      )}
    >
      {title}
      {loading ? (
        <div className="text-primary absolute top-0 left-0 size-full">
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
        "hover:bg-pink text-pink relative bg-[rgba(245,0,87,0.1)] transition-colors hover:text-white",
        commonButtonStyles,
        className,
      )}
    >
      {title}
      {loading ? (
        <div className="text-primary absolute top-0 left-0 size-full">
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
        "group bg-secondary-100 hover:bg-secondary relative transition-colors",
        commonButtonStyles,
        className,
      )}
    >
      <span className="text-secondary group-hover:text-white">{title}</span>
      {loading ? (
        <div className="text-primary absolute top-0 left-0 size-full">
          <ButtonLoading />
        </div>
      ) : null}
    </button>
  );
};

// Refresh Button Component
export const ButtonReload: React.FC<Partial<ButtonProps>> = ({
  onClick,
  className = "",
}) => {
  return (
    <div className={cn("size-10", className)}>
      <button
        type="button"
        className="bg-secondary-100 text-secondary hover:bg-secondary flex size-full items-center justify-center rounded-lg p-2 font-normal transition-colors duration-200 hover:text-white"
        onClick={onClick}
      >
        <RefreshCcwDot className="size-full" />
      </button>
    </div>
  );
};
