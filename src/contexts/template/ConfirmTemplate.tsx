/* eslint-disable no-unused-vars */
import { DialogContent, DialogHeader, DialogTitle, Dialog, DialogBody } from "@/src/components/ui/dialog";
import { ButtonLoading } from "@/src/lib/bik-button";
import React, { FC } from "react";

export type confirmTypeProps = {
  show: boolean;
  text: string;
  textCancel?: string;
  textAction?: string;
  textActionCname?: string;
  clickAction?: (confirm: confirmTypeProps, setConfirm: (value: confirmTypeProps) => void) => void;
} | null;

interface ConfirmProps {
  setConfirm: (value: confirmTypeProps) => void;
  confirm: {
    text: string;
    textCancel?: string;
    textAction?: string;
    textActionCname?: string;
    clickAction?: (confirm: confirmTypeProps, setConfirm: (value: confirmTypeProps) => void) => void;
    show: boolean;
  } | null;
  templateLoading: boolean;
}

const TemplateContent: FC<ConfirmProps> = ({ setConfirm, confirm, templateLoading }) => {
  const { text, textCancel, textAction, textActionCname, clickAction, show } = confirm || {};

  if (!show) return null;
  return (
    <DialogContent aria-describedby={undefined} className="max-w-[450px] [&>button]:!hidden">
      <DialogHeader className="border-0">
        <DialogTitle></DialogTitle>
      </DialogHeader>

      <DialogBody>
        <div className="cart-empty-modal relative">
          <div className="mb-3 flex justify-center">
            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24.5" cy="24.5" r="24" stroke="#FFA41D" />
              <path
                d="M26.9659 18.275H26.9676L25.5534 27.7142H25.5516C25.4673 28.3578 25.2351 28.846 24.4998 28.846C23.7645 28.846 23.5324 28.3578 23.448 27.7142H23.4462L22.0321 18.275H22.0337C22.0123 18.1109 22 17.9421 22 17.7692C22 16.2398 22.8414 15 24.5 15C26.1584 15 27 16.2398 27 17.7692C26.9996 17.9423 26.9874 18.1109 26.9659 18.275ZM24.4996 30.6923C23.2097 30.6923 22.5552 31.6565 22.5552 32.8462C22.5552 34.0358 23.2097 35 24.4996 35C25.7896 35 26.4441 34.0358 26.4441 32.8462C26.4441 31.6565 25.7896 30.6923 24.4996 30.6923Z"
                fill="#FFA41D"
              />
            </svg>
          </div>

          <div className="mb-5">
            <p className="text-primary mb-3 text-center text-base font-normal">{text || "--"}</p>
          </div>

          <div className="flex justify-center gap-2.5">
            <button
              type="button"
              className="bg-error min-w-20 cursor-pointer rounded-[8px] px-4 py-2 text-sm font-normal text-white disabled:opacity-50"
              onClick={() => {
                setConfirm(null);
              }}
              disabled={templateLoading}
            >
              {textCancel || "No"}
            </button>
            <button
              type="button"
              className={`bg-success relative min-w-20 cursor-pointer rounded-[8px] px-4 py-2 text-sm font-normal text-white ${textActionCname}`}
              onClick={() => {
                if (typeof clickAction === "function") {
                  clickAction(confirm, setConfirm);
                }
              }}
              disabled={templateLoading}
            >
              {textAction || "Yes"}
              {templateLoading ? (
                <div className="text-primary absolute top-0 left-0 size-full">
                  <ButtonLoading />
                </div>
              ) : null}
            </button>
          </div>
        </div>
      </DialogBody>
    </DialogContent>
  );
};

const ConfirmTemplate: React.FC<ConfirmProps> = ({ setConfirm, confirm, templateLoading }) => {
  return (
    <Dialog open={confirm?.show}>
      <TemplateContent confirm={confirm} setConfirm={setConfirm} templateLoading={templateLoading} />
    </Dialog>
  );
};

export default ConfirmTemplate;
