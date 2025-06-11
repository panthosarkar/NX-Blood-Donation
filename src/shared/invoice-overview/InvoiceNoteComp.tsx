import { FC } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TInvoiceInfo } from "@/bik-lib/types/invoice";
import Image from "next/image";
import editIcon from "./icon-edit.svg";
import resetIcon from "./icon-reset.svg";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import useApi from "@/bik-lib/utils/useApi";

const InvoiceNoteComp: FC<{
  show: boolean;
  data: TInvoiceInfo;
  reload: () => void;
}> = ({ show, data, reload }) => {
  const { put } = useApi();
  const { openModal, setMessage, setConfirm, setTemplateLoading } =
    useTemplate();
  const isNoteAvailable =
    data?.noteTitle?.length > 0 || data?.noteDescription?.length > 0;

  const resetNote = () => {
    setConfirm({
      show: true,
      text: "Are you sure you want to reset this note?",
      textCancel: "No",
      txtAction: "Yes",

      clickAction: () => {
        setMessage("Resetting...");
        setTemplateLoading(true);
        put(`/admin/invoice/${data?.id}/reset-note`, {})
          .then(({ message }) => {
            setMessage(message as string);
            setConfirm(null);
            reload();
          })
          .catch((err: Error) => {
            setMessage(err);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  if (!show) return null;
  return (
    <div>
      {!isNoteAvailable ? (
        <button
          className="text-primary font-medium text-sm hover:underline mt-5 print:hidden"
          onClick={() => {
            openModal("add-note");
          }}
        >
          Add Note +
        </button>
      ) : null}

      {isNoteAvailable ? (
        <div className="mt-5 print:hidden w-fit bg-[#8080802e] px-3 pr-13 py-2 rounded-10 -ml-3 cursor-pointer group relative">
          <div className="text-sm">
            <h4 className="text-primary font-medium">{data?.noteTitle}</h4>
            <p>{data?.noteDescription}</p>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-[calc(100%_-_12px)] invisible group-hover:visible invoice-edit-btn ">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="size-5 -mr-2 bg-error rounded-full p-1"
                onClick={() => openModal("add-note", data)}
              >
                <TooltipWrapper content="Edit Note" asChild>
                  <Image
                    src={editIcon}
                    alt="edit icon"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </TooltipWrapper>
              </button>
              <button
                type="button"
                className="size-5 -mr-2 bg-error rounded-full p-1"
                onClick={resetNote}
              >
                <TooltipWrapper content="Reset Note" asChild>
                  <Image
                    src={resetIcon}
                    alt="edit icon"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto rounded-full"
                  />
                </TooltipWrapper>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InvoiceNoteComp;
