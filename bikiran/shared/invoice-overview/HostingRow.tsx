import { FC, Fragment } from "react";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import editIcon from "./icon-edit.svg";
import deleteIcon from "./icon-delete.svg";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { cn } from "@/bik-lib/utils/cn";
import {
  TInvoiceItem,
  TInvoice,
} from "@/bikiran/components/billing-invoice-manage/invoiceManageTypes";

const HostingRow: FC<{
  index: number;
  data: TInvoiceItem;
  editable: boolean;
  reload?: () => void;
  invoice: TInvoice;
}> = ({ index, data, invoice, editable, reload }) => {
  const unit = capitalizeFirstLetter(data?.unitName?.toLowerCase() || ""); //EX: month or year

  const { openModal, setConfirm, setMessage, setTemplateLoading } =
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

  const showDescription = (input: string = "") => {
    // Return null if empty string
    if (!input.trim()) return null;
    // 1. Split by commas first
    const commaSeparated = input.split(",");
    // 2. Process each segment (handling newlines)
    const items: { label: string; value: string; isNewline: boolean }[] = [];
    commaSeparated.forEach((segment) => {
      const newlineSplit = segment.split("\n");
      newlineSplit.forEach((item, i) => {
        const trimmed = item.trim();
        if (!trimmed) return;
        const match = trimmed.match(/\*\*(.*?)\*\*/);
        if (match) {
          items.push({
            label: trimmed.replace(/\*\*(.*?)\*\*/, "").trim(),
            value: match[1].trim(),
            isNewline: i > 0, // Mark if came after newline
          });
        }
      });
    });

    // 3. Render with <br/> for newlines
    return (
      <div className="whitespace-pre-wrap">
        {items.map((item, index) => (
          <Fragment key={index}>
            {item.isNewline && <br />}
            <span className="text-primary-700">{item.label}: </span>
            <span className="font-medium text-primary">
              {item.value}
              {/* Add comma except for last item or before line break */}
              {index < items.length - 1 && !items[index + 1]?.isNewline && ", "}
            </span>
          </Fragment>
        ))}
      </div>
    );
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
          <div className="text-[10px]">
            {showDescription(data?.description)}
          </div>
          <p className="grid grid-cols-[60px_auto] gap-2 text-[10px]">
            <span className="text-primary-700">Domain:</span>{" "}
            {data?.domain ? (
              <span className="font-medium text-primary">{data?.domain}</span>
            ) : (
              <i className="text-xs">[Not Assigned]</i>
            )}
          </p>
          <p className="grid grid-cols-[60px_auto] gap-2 text-[10px]">
            <span className="text-primary-700">Duration:</span>
            <span className="text-primary font-medium">
              {" "}
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
      <td className=" text-end text-[10px]">
        <span className="font-medium">{showInt(data.totalPrice) || 0}</span>
      </td>
      <td className=" text-end font-medium text-[10px]">
        {/* {showCurrencySign(invoice?.localCurrency)}{" "} */}
        {showInt(data.priceOffer || 0)}
        {editable && status !== "ACTIVE" && (
          <div className="absolute top-1/2 -translate-y-1/2 left-[calc(100%_-_12px)] invisible group-hover:visible invoice-edit-btn ">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="size-6 -mr-2 bg-error rounded-full p-1.5"
                onClick={() =>
                  openModal("update-invoice-product", {
                    ...data,
                    contractCurrency: invoice?.localCurrency,
                  })
                }
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

export default HostingRow;
