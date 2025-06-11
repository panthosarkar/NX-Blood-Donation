/* eslint-disable no-unused-vars */
import { ButtonLoading } from "@/bik-lib/lib/button";
import { cn } from "@/bik-lib/utils/cn";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import React, { FC } from "react";

interface ConfirmProps {
  setConfirm: (value: any) => void;
  confirm: {
    text?: string;
    textCancel?: string;
    textAction?: string;
    textActionCname?: string;
    textCancelCname?: string;
    clickAction?: (confirm: any, setConfirm: (value: any) => void) => void;
    show: boolean;
  } | null;
  templateLoading: boolean;
}

/* 
USAGE:-------------------------------------
      setConfirm({
          show: true,
          text: "Are you sure you want to delete this?",
          textCancel: "No",
          textAction: "Yes",
          clickAction: () => {
            // Your action here
            // When complete, close the confirm dialog
            setConfirm(null)
          },
      });
*/

const ModalContent: FC<{
  confirm: any;
  setConfirm: (value: any) => void;
  templateLoading: boolean;
}> = ({ confirm, templateLoading, setConfirm }) => {
  const {
    text,
    textCancel,
    textAction,
    textActionCname,
    textCancelCname,
    clickAction,
  } = confirm || {};
  return (
    <div className="cart-empty-modal mb-8 relative">
      <div className="mb-3 flex justify-center">
        <svg
          width="49"
          height="49"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24.5" cy="24.5" r="24" stroke="#FFA41D" />
          <path
            d="M26.9659 18.275H26.9676L25.5534 27.7142H25.5516C25.4673 28.3578 25.2351 28.846 24.4998 28.846C23.7645 28.846 23.5324 28.3578 23.448 27.7142H23.4462L22.0321 18.275H22.0337C22.0123 18.1109 22 17.9421 22 17.7692C22 16.2398 22.8414 15 24.5 15C26.1584 15 27 16.2398 27 17.7692C26.9996 17.9423 26.9874 18.1109 26.9659 18.275ZM24.4996 30.6923C23.2097 30.6923 22.5552 31.6565 22.5552 32.8462C22.5552 34.0358 23.2097 35 24.4996 35C25.7896 35 26.4441 34.0358 26.4441 32.8462C26.4441 31.6565 25.7896 30.6923 24.4996 30.6923Z"
            fill="#FFA41D"
          />
        </svg>
      </div>

      <div className="mb-5">
        <p className="text-primary text-base text-center font-normal mb-3">
          {text || "--"}
        </p>
      </div>

      <div className="flex justify-center gap-2.5">
        <button
          type="button"
          className={cn(
            "bg-error text-white text-sm font-normal rounded-[8px] px-4 py-2 min-w-20 relative ",
            textActionCname
          )}
          onClick={() => {
            if (typeof clickAction === "function") {
              clickAction(confirm, setConfirm);
            }
          }}
          disabled={templateLoading}
        >
          {textAction || "Yes"}
          {templateLoading ? (
            <div className="absolute top-0 left-0 size-full text-primary">
              <ButtonLoading />
            </div>
          ) : null}
        </button>

        <button
          type="button"
          className={cn(
            "bg-[#17dc69] text-white text-sm font-normal rounded-[8px] px-4 py-2 min-w-20",
            textCancelCname
          )}
          onClick={() => {
            setConfirm(null);
          }}
          disabled={templateLoading}
        >
          {textCancel || "No"}
        </button>
      </div>
    </div>
  );
};

const ConfirmTemplate: React.FC<ConfirmProps> = ({
  setConfirm,
  confirm,
  templateLoading,
}) => {
  const { show } = confirm || {};

  return (
    <Dialog open={show}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-[450px] [&>button]:!hidden"
      >
        <DialogHeader className="border-0">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogBody>
          {show && (
            <ModalContent
              confirm={confirm}
              setConfirm={setConfirm}
              templateLoading={templateLoading}
            />
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmTemplate;
