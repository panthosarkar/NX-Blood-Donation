import { cn } from "@/bik-lib/utils/cn";
import { ReactNode } from "react";
import "./style.css";

type InfoDividerProps = {
  title: string;
  className?: string;
  children?: ReactNode;
};

export const InfoDivider = ({
  title,
  className,
  children,
}: InfoDividerProps) => {
  return (
    <div className="info_divider">
      <h2 className={className}>{title}</h2>
      <hr />
      {children}
    </div>
  );
};

type InfoWrapperProps = {
  children: ReactNode;
  className?: string;
};

const InfoWrapper = ({ children, className }: InfoWrapperProps) => {
  return <div className={cn("info_wrapper", className)}>{children}</div>;
};

export default InfoWrapper;
