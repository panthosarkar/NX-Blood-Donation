import { FC } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";
import editIcon from "./icon-edit.svg";
import deleteIcon from "./icon-delete.svg";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { cn } from "@/bik-lib/utils/cn";
import {
  TInvoiceItem,
  TInvoice,
} from "@/bikiran/components/billing-invoice-manage/invoiceManageTypes";

const DomainRow: FC<{
  index: number;
  data: TInvoiceItem;
  editable: boolean;
  reload?: () => void;
  invoice: TInvoice;
}> = ({ index, data, editable, invoice, reload }) => {
  const unit = capitalizeFirstLetter(data?.unitName?.toLowerCase() || ""); //EX: month or year
  const { openModal, setConfirm, setTemplateLoading, setMessage } =
    useTemplate();
  const { put } = useApi();

  const status = invoice?.status || "";
  const invoiceId = invoice?.id || 0;

  const deleteProduct = (productId: number) => {
    setConfirm({
      show: true,
      text: "Are you sure you want to remove this item ?",
      textCancel: "Cancel",
      textCancelCname: "bg-primary-300",
      txtAction: "Yes",
      clickAction: () => {
        setTemplateLoading(true);
        setMessage("Removing...");
        put(`/admin/invoice/${invoiceId}/delete-item/${productId}`, {})
          .then(({ message }) => {
            setMessage(message);
            setConfirm(null);
            if (reload) {
              reload();
            }
          })
          .catch((er: Error) => {
            setMessage(er.message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  return (
    <tr
      className={cn(
        "[&>td]:border [&>td]:border-black [&>td]:px-2 [&>td]:py-2 relative group",
        {
          "hover:!bg-[#8080802e]": editable,
        }
      )}
    >
      <td className="border border-black px-2 py-1 text-center text-[10px]">
        {index + 1}
      </td>
      <td className="">
        <div className="">
          <p className="text-primary font-medium text-[11px]">{data.title}</p>
          <p className="grid grid-cols-[60px_auto] gap-2 text-[10px]">
            <span className="text-primary-700">
              {data?.assetKey === "DOMAIN" ? "Domain: " : "Identity: "}
            </span>
            {data?.domain ? (
              <span className="font-medium text-primary">{data?.domain}</span>
            ) : (
              <i className="text-[10px]">[Not Assigned]</i>
            )}
          </p>
          <p className="grid grid-cols-[60px_auto] gap-2 text-[10px]">
            <span className="text-primary-700">Duration: </span>
            <span className="text-primary font-medium">
              {data.duration || 0}
            </span>
          </p>
        </div>
      </td>
      <td className=" text-center text-[10px]">
        <span className="font-medium">
          {/* {showCurrencySign(invoice?.localCurrency)} */}
          {showInt(data.price || 0)}
        </span>
        <br />/{unit}
      </td>
      <td className=" text-center text-[10px]">
        <span className="font-medium">{data.quantity || 0}</span> {unit}
      </td>
      <td className=" text-end text-[10px]">{showInt(data.totalPrice || 0)}</td>
      <td className=" text-end font-medium text-[10px]">
        {/* {showCurrencySign(invoice?.localCurrency)}{" "} */}
        {showInt(data.totalPrice || 0)}
        {editable && status !== "ACTIVE" && (
          <div className="absolute top-1/2 -translate-y-1/2 left-[calc(100%_-_12px)] invisible group-hover:visible invoice-edit-btn ">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="size-6 -mr-2 bg-error rounded-full p-1.5"
                onClick={() => openModal("update-invoice-product", data)}
              >
                <Image
                  src={editIcon}
                  alt="edit icon"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </button>
              <button
                type="button"
                className="size-6 -mr-2 bg-error rounded-full"
                onClick={() => deleteProduct(data.id)}
              >
                <Image
                  src={deleteIcon}
                  alt="edit icon"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto rounded-full"
                />
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default DomainRow;
