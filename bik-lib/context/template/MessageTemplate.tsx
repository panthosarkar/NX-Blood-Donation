import React, { useEffect } from "react";
import { MessageTemplateProps } from "./TemplateTypes";
import { text } from "stream/consumers";

const CrossIcon: React.FC = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fal"
      data-icon="times"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path
        fill="currentColor"
        d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
      />
    </svg>
  );
};

// MessageTemplate component with TS types
const MessageTemplate: React.FC<MessageTemplateProps> = ({
  message,
  setMessage,
}) => {
  const handleClose = () => {
    setMessage({ text: null });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage((cVal) => {
        if (cVal.text) {
          return { ...cVal, text: null };
        }
        return cVal;
      });
    }, message.timeout);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (!message.text) {
    return null;
  }

  return (
    <div className="floating-message flex flex-nowrap">
      <span className="flex-auto self-center leading-5">{message.text}</span>
      <button
        type="button"
        onClick={handleClose}
        className="flex-initial self-center"
      >
        <CrossIcon />
      </button>
    </div>
  );
};

export default MessageTemplate;
