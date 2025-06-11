import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
type NoSsrProps = {
  children: ReactNode;
};

const NoSsr: React.FC<NoSsrProps> = ({ children }: NoSsrProps) => {
  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(NoSsr), { ssr: false });
