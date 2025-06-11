"use client";
import React, { createContext, use, useMemo, useRef, useState } from "react";
import MessageTemplate from "./MessageTemplate";
import { Message } from "./TemplateTypes";
import ConfirmTemplate, { confirmTypeProps } from "./ConfirmTemplate";
import { TState } from "@/src/types/event";

interface TemplateContextType {
  suggestRef: React.RefObject<HTMLElement | null>;
  message: any | null;
  setMessage: (type: "error" | "success" | "warning" | "info", text: string | Error | null | undefined, stay?: number) => void;
  confirm: confirmTypeProps;
  setConfirm: (value: confirmTypeProps) => void;
  templateLoading: boolean;
  setTemplateLoading: (value: boolean) => void;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
  modalType: string;
  modalData: any | null;
  price?: number | null;
  setPrice: (value: number) => void;
  remove?: boolean;
  setRemove?: TState<boolean>;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function useTemplate() {
  const context = use(TemplateContext);

  return context as TemplateContextType;
}

const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const suggestRef = useRef<HTMLElement>(null);
  const [message2, setMessage2] = useState<Message>({
    type: "error",
    text: null,
    timeout: 6000,
  });
  const [price, setPrice] = useState<number | null>(null);
  const [remove, setRemove] = useState<boolean>(false);

  const [confirm, setConfirm] = useState<any | null>(null);
  const [templateLoading, setTemplateLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<{
    type: string;
    data: any | null;
  }>({
    type: "",
    data: null,
  });

  const value = useMemo(() => {
    const openModal = (type: string, data: any) => {
      setShowDialog({ type, data });
    };

    const closeModal = () => {
      setShowDialog({ type: "", data: null });
    };

    const setMessage = (type: "error" | "success" | "warning" | "info", text: string | Error | null | undefined, stay?: number) => {
      const mStay = stay && stay > 3000 && stay < 10000 ? stay : 6000;

      if (typeof text === "string") {
        setMessage2({ type, text, timeout: mStay });
        return;
      }

      if (text instanceof Error) {
        setMessage2({ type, text: text.message, timeout: mStay });
        return;
      }

      if (text === null || typeof text === "undefined") {
        setMessage2({ type, text: null, timeout: 0 });
        return;
      }

      setMessage2({
        type,
        text: text || "Something went wrong",
        timeout: 6000,
      });
    };

    return {
      suggestRef,
      message: message2.text,
      setMessage,
      confirm,
      setConfirm,
      templateLoading,
      setTemplateLoading,
      openModal,
      closeModal,
      modalType: showDialog.type,
      modalData: showDialog.data,
      price,
      setPrice,
      remove,
      setRemove,
    };
  }, [confirm, message2, showDialog, templateLoading, price, remove]);

  return (
    <TemplateContext.Provider value={value}>
      {children}
      <MessageTemplate message={message2} setMessage={setMessage2} />
      <ConfirmTemplate confirm={confirm} setConfirm={setConfirm} templateLoading={templateLoading} />
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
