"use client";
import { getAccountUrl } from "@/bik-lib/utils/Env";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the context type
interface Com2ContextType {
  message: Record<string, any>;
}

const Com2Context = createContext<Com2ContextType | undefined>(undefined);

export function useCom2() {
  const context = useContext(Com2Context);
  if (!context) {
    throw new Error("useCom2 must be used within a Com2Provider");
  }
  return context;
}

// Iframe Handler function
const iframeHandler = (authUrl: string) => {
  const iframe = document.createElement("iframe");
  iframe.src = `${authUrl}/i`;
  iframe.title = "Auth";
  iframe.style.cssText =
    "width:0px; height:0px; border:0px solid;position:fixed;";
  return iframe;
};

// Send message to child iframe
export const sendToChild = (
  path: string,
  body: Record<string, any>,
  requestId = "",
  responseId = ""
): boolean => {
  // Find auth iframe
  const iframe =
    document.querySelector<HTMLIFrameElement>("iframe[title=Auth]");

  // Stop if not ready
  if (!iframe) {
    return false;
  }

  const dateTime = new Date().toISOString();
  const host = window.location.origin;
  iframe.contentWindow?.postMessage(
    {
      head: {
        appId: "bikiran",
        requestId,
        responseId,
        dateTime,
        host,
        path,
      },
      body,
    },
    "*"
  );

  return true;
};

interface Com2ProviderProps {
  children: ReactNode;
}

function Com2Provider({ children }: Com2ProviderProps) {
  // State
  const [message, setMessage] = useState<Record<string, any>>({});
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);

  // Iframe Handler
  useEffect(() => {
    const iframeDom = iframeHandler(getAccountUrl());

    // Starting Iframe
    setIframe(iframeDom);
    document.body.appendChild(iframeDom);

    return () => {
      // Removing Iframe
      setIframe(null);
      iframeDom.remove();
    };
  }, []);

  // Message Listener
  useEffect(() => {
    // Receive message from child
    const requestHandler = ({ data, origin }: MessageEvent) => {
      // Only process messages from the app "bikiran"
      if (data.head?.appId !== "bikiran") {
        return;
      }

      // Update Received Message
      if (data.head.path) {
        setMessage({ data, origin });
      }
    };

    // Starting Event Listener
    window.addEventListener("message", requestHandler);

    return () => {
      // Removing Event Listener
      setMessage({});
      window.removeEventListener("message", requestHandler);
    };
  }, [iframe]);

  // Context Values
  const value = { message };

  return <Com2Context.Provider value={value}>{children}</Com2Context.Provider>;
}

export default Com2Provider;
