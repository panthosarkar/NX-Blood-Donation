import React from "react";
import { cn } from "@/bik-lib/utils/cn";
import "./style.css";

interface ButtonWrapperProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  children,
  active,
  className,
}) => {
  return (
    <div
      className={cn("hover_icon", className, {
        active: active,
      })}
      //   onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ButtonWrapper;
