"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import MessageTemplate from "./MessageTemplate";
import ConfirmTemplate from "./ConfirmTemplate";
import { Message } from "./TemplateTypes";
import StatusUpdateTemplate from "./StatusUpdateTemplate";
import { TState } from "@/bik-lib/types/event";

export type TStatusTemplate = {
  array: string[];
  defaultValue?: string;
  name?: string;
  clickAction: (payload: any) => void;
};

interface TemplateContextType {
  message: any | null;
  setMessage: (text: string | Error | null | undefined, stay?: number) => void;
  confirm: any | null;
  setConfirm: (value: any) => void;
  setStatus: TState<TStatusTemplate | null>;
  status: TStatusTemplate | null;
  templateLoading: boolean;
  setTemplateLoading: (value: boolean) => void;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
  modalType: string;
  modalData: any | null;
}

const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined
);

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
}

const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const suggestRef = useRef<HTMLElement>(null);
  const [message2, setMessage2] = useState<Message>({
    text: null,
    timeout: 6000,
  });

  const [confirm, setConfirm] = useState<any | null>(null);
  const [status, setStatus] = useState<TStatusTemplate | null>(null);
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

    const setMessage = (
      text: string | Error | null | undefined,
      stay?: number
    ) => {
      const mStay = stay && stay > 3000 && stay < 10000 ? stay : 6000;

      if (typeof text === "string") {
        setMessage2({ text, timeout: mStay });
        return;
      }

      if (text instanceof Error) {
        setMessage2({ text: text.message, timeout: mStay });
        return;
      }

      if (text === null || typeof text === "undefined") {
        setMessage2({ text: null, timeout: 0 });
        return;
      }

      setMessage2({ text: text || "Something went wrong", timeout: 6000 });
    };

    return {
      message: message2.text,
      setMessage,
      confirm,
      setConfirm,
      setStatus,
      status,
      templateLoading,
      setTemplateLoading,
      openModal,
      closeModal,
      modalType: showDialog.type,
      modalData: showDialog.data,
    };
  }, [confirm, status, message2, showDialog, templateLoading]);

  return (
    <TemplateContext.Provider value={value}>
      {children}
      <MessageTemplate message={message2} setMessage={setMessage2} />
      <ConfirmTemplate
        confirm={confirm}
        setConfirm={setConfirm}
        templateLoading={templateLoading}
      />
      <StatusUpdateTemplate
        status={status}
        setStatus={setStatus}
        templateLoading={templateLoading}
      />
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
