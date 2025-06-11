import React from "react";

export interface TDrawerDividerProps {
  show: boolean;
  className?: string;
}

export interface TDrawerOptionProps {
  children: React.ReactNode | React.ReactNode[];
  show?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface TDrawerPopupProps {
  show?: boolean;
  children: React.ReactNode | React.ReactNode[];
  open: boolean;
  setOpen: any;
  className?: string;
}
